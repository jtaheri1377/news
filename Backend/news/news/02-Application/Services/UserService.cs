using lms_dashboard._02_Application.Mapper;
using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.User;
using news._02_Application.Dto;
using news._02_Application.Interfaces;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class UserService : IUserService
    {
        private readonly NewsDbContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(NewsDbContext db, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<UserDto>> GetAll()
        {
            var users = await _db.Users
                .Where(u => !u.IsDeleted)
                .OrderByDescending(u => u.Id)
                .Include(u => u.RepresentativeProvinces)
                .Include(u => u.Roles)
                .ToListAsync();

            return users.ToListDto();
        }

        public async Task<List<UserDto>> GetRepresentative(int provinceId)
        {
            var users = await _db.Users
                .Include(u => u.Roles)
                .Include(u => u.RepresentativeProvinces)
                .Where(u => u.RepresentativeProvinces.Any(rp => rp.Id == provinceId || rp.ParentId == provinceId))
                .ToListAsync();

            return users.ToListDto();
        }

        private int _getUserIdFromToken()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst("uid")
                ?? throw new UnauthorizedAccessException("کاربر احراز هویت نشده یا شناسه کاربری در سیستم یافت نشد.");

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new ArgumentException("فرمت شناسه کاربری نامعتبر است.");
            }
            return userId;
        }

        public async Task<UserDto> GetById(int id)
        {
            var user = await _db.Users
                .Include(u => u.Roles)
                .Include(u => u.RepresentativeProvinces)
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            return user?.ToDto();
        }

        public async Task<UserSummaryDto> GetCurrent()
        {
            int userId = _getUserIdFromToken();
            var user = await _db.Users
                .Include(u => u.Roles)
                .Include(u => u.RepresentativeProvinces)
                .FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted);

            return user?.ToSummaryDto();
        }

        public async Task<User> Save(UserSaveDto dto)
        {
            User user;

            if (dto.Id == 0)
            {
                if (await _db.Users.AnyAsync(u => u.NationalCode == dto.NationalCode))
                    throw new Exception("کاربر مورد نظر قبلا در سیستم ثبت شده است!");

                user = dto.ToModel();
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

                user.Roles = await _db.Roles.Where(r => dto.RoleIds.Contains(r.Id)).ToListAsync();
                user.RepresentativeProvinces = await _db.Provinces.Where(p => dto.RepresentativeProvinceIds.Contains(p.Id)).ToListAsync();

                _db.Users.Add(user);
            }
            else
            {
                user = await _db.Users
                    .Include(u => u.Roles)
                    .Include(u => u.RepresentativeProvinces)
                    .FirstOrDefaultAsync(u => u.Id == dto.Id && !u.IsDeleted);

                if (user == null) return null;

                user.Name = dto.Name;
                user.Family = dto.Family;
                user.Email = dto.Email;
                user.NationalCode = dto.NationalCode;
                user.IsActive = dto.IsActive;
                user.Address = dto.Address;
                user.Phone1 = dto.Phone1;
                user.Phone2 = dto.Phone2;
                user.SocialMedia1 = dto.SocialMedia1;
                user.SocialMedia2 = dto.SocialMedia2;

                if (!string.IsNullOrEmpty(dto.Password))
                {
                    if (dto.Password.Length < 6)
                        throw new Exception("کلمه عبور باید حداقل 6 کاراکتر باشد");
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                }

                var newRoles = await _db.Roles.Where(r => dto.RoleIds.Contains(r.Id)).ToListAsync();
                user.Roles = newRoles; // EF Core تغییرات را ردیابی می‌کند

                var newProvinces = await _db.Provinces.Where(p => dto.RepresentativeProvinceIds.Contains(p.Id)).ToListAsync();
                user.RepresentativeProvinces = newProvinces; // EF Core تغییرات را ردیابی می‌کند
            }

            await _db.SaveChangesAsync();
            return user;
        }

        public async Task<bool> Delete(int id)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
            if (user == null) return false;

            user.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}