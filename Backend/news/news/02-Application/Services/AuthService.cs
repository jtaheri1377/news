using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using news._01_Domain.Models_Entities_.User;
using news._02_Application.Settings;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly NewsDbContext _db;
        private readonly JwtSettings _jwtSettings;

        public AuthService(NewsDbContext db, IOptions<JwtSettings> jwtOptions)
        {
            _db = db;
            _jwtSettings = jwtOptions.Value;
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
                SocialMedia1=dto.SocialMedia1,
                SocialMedia2 = dto.SocialMedia2,
                Phone1=dto.Phone1,
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return GenerateJwtToken(user);
        }

        public async Task<string?> LoginAsync(string username, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.NationalCode == username);
            if (user == null) return null;

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isPasswordValid) return null;

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

    }
}
