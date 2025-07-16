using lms_dashboard._01_Domain.Model;
using lms_dashboard._02_Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using news._01_Domain.Models_Entities_.User;
using news._02_Application.Settings;
using news._03_Infrastructure.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace news._02_Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly NewsDbContext _db;
        private readonly JwtSettings _jwtSettings;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Random _random = new Random();
        private readonly ISmsService _smsService;
        private readonly IEmailService _emailService;

        public AuthService(NewsDbContext db, IOptions<JwtSettings> jwtOptions, IHttpContextAccessor httpContextAccessor, ISmsService smsService, IEmailService emailService)
        {
            //, Random random, 
            _db = db;
            _jwtSettings = jwtOptions.Value;
            this._httpContextAccessor = httpContextAccessor;
            //_random = random;
            _smsService = smsService;
            _emailService = emailService;
        }

        public async Task<string?> RegisterAsync(RegisterDto dto)
        {
            var userExists = await _db.Users.AnyAsync(u => u.NationalCode == dto.NationalCode);
            if (userExists) return null;

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                NationalCode = dto.NationalCode,
                PasswordHash = passwordHash,
                Family = dto.Family,
                Name = dto.Name,
                IsActive = dto.IsActive,
                SocialMedia1 = dto.SocialMedia1,
                SocialMedia2 = dto.SocialMedia2,
                Phone1 = dto.Phone1,
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return GenerateJwtToken(user);
        }

        public async Task<string?> LoginAsync(string username, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.NationalCode == username);
            if (user == null)
                throw new Exception("اطلاعات وارد شده صحیح نمی باشد");

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isPasswordValid)
                throw new Exception("کلمه عبور صحیح نمی باشد");

            if (!user.IsActive)
                throw new Exception("حساب کاربری شما مسدود شده است با پشتیبانی تماس بگیرید!");


            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim("NationalCode", user.NationalCode),
                new Claim("uid", user.Id.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }





        public async Task ResetPasswordBySms(ResetPasswordDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.NationalCode == dto.Username);
            if (user == null || user.IsDeleted) throw new Exception("کاربر مورد نظر در سیستم وجود ندارد!");

            if (user.Phone1 != dto.Phone && user.Phone2 != dto.Phone) throw new Exception("لطفاً شماره موبایل خود کاربر را وارد کنید!");

            var newPassword = _random.Next(100000, 999999).ToString();
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            _db.Users.UpdateRange(user);
            await _db.SaveChangesAsync();

            await _smsService.SendNewPassword(user.Phone1, newPassword);
        }

        public async Task ResetPasswordByEmail(ResetPasswordByEmailDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.NationalCode == dto.Username);
            if (user == null || user.IsDeleted) throw new Exception("کاربر مورد نظر در سیستم وجود ندارد!");

            var newPassword = _random.Next(100000, 999999).ToString();
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            _db.Users.UpdateRange(user);
            await _db.SaveChangesAsync();

            string subject = "بازیابی رمز عبور دارالحکمه";
            string message = $"<h2><b>آموزش عالی دارالحکمه</b></h2> <p><b>نام کاربری: {user.NationalCode}</b></p><p><b>کد جدید ورود: {newPassword}</b></p><p>لطفاً این کد را در اختیار هیچ‌کس قرار ندهید.</p>";

            _emailService.SendEmailAsync(user.Email, subject, message);
        }


        [Authorize]
        public async Task ChangePassword(ChangePasswordDto dto) // باید async باشد و Task را return کند
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst("uid");

            if (userIdClaim == null)
                throw new UnauthorizedAccessException("کاربر احراز هویت نشده یا شناسه کاربری در توکن یافت نشد.");


            if (dto.NewPassword != dto.ConfirmNewPassword)
                throw new UnauthorizedAccessException("رمز عبور جدید به درستی تکرار نشده است!");


            // تبدیل User ID به نوع مناسب (فرض می‌کنیم int است)
            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new ArgumentException("فرمت شناسه کاربری نامعتبر است.");
            }

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                throw new Exception("کاربر مورد نظر در سیستم وجود ندارد!");
            }

            // 3. بررسی رمز عبور فعلی کاربر
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                throw new Exception("رمز عبور فعلی اشتباه است.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            _db.Users.UpdateRange(user);
            await _db.SaveChangesAsync();

        }

    }
}
