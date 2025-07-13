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

        public UserService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<UserDto>> GetAll()
        {
            var result=await _db.Users.Where(u => !u.IsDeleted)
                .OrderByDescending(u => u.Id)
                .Include(u => u.Roles)
                .ToListAsync(); // فقط کاربران غیر حذف شده
        
        return result.ToListDto();
        }

        public async Task<UserDto> GetById(int id)
        {
           var result=  await _db.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted); // فقط کاربران غیر حذف شده
        
            return result.ToDto();
        }

        public async Task<User> Save(UserSaveDto dto)
        {
            if (dto.Id == 0)
            {
                var userExists = await _db.Users.AnyAsync(u => u.NationalCode == dto.NationalCode);
                if (userExists) throw new Exception("کاربر مورد نظر قبلا در سیستم ثبت شده است!");

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

                var user = dto.ToModel();

                var roles = await _db.Roles
                    .Where(r => dto.RoleIds.Contains(r.Id))
                    .ToListAsync();

                user.Roles = roles;
                _db.Users.Add(user);
                await _db.SaveChangesAsync();
            }
            else
            {
                var existingUser = await _db.Users
                    .Include(u => u.Roles)
                    .FirstOrDefaultAsync(u => u.Id == dto.Id && !u.IsDeleted);
                if (existingUser == null) return null;

                existingUser.Name = dto.Name;
                existingUser.Family = dto.Family;
                existingUser.Email = dto.Email;
                existingUser.NationalCode = dto.NationalCode;
                existingUser.IsActive = dto.IsActive;
                existingUser.Address = dto.Address;
                existingUser.Phone1 = dto.Phone1;
                existingUser.Phone2 = dto.Phone2;
                existingUser.SocialMedia1 = dto.SocialMedia1;
                existingUser.SocialMedia2 = dto.SocialMedia2;
                if (dto.Password.Length > 0)
                {
                    if (dto.Password.Length < 6) throw new Exception("کلمه عبور باید حداقل 6 کاراکتر باشد");
                    existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                }

                var roles = await _db.Roles
                    .Where(r => dto.RoleIds.Contains(r.Id))
                    .ToListAsync();

                existingUser.Roles!.Clear();
                existingUser.Roles = roles;

                //_db.Users.Update(existingUser);

            }

            await _db.SaveChangesAsync();
            return new User();
        }

        public async Task<bool> Delete(int id)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
            if (user == null) return false;

            user.IsDeleted = true;  // حذف منطقی
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
