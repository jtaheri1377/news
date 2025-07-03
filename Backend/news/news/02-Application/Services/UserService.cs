using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.User;
using news._02_Application.Dto;
using news._02_Application.Interfaces;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class UserService:IUserService
    {
        private readonly NewsDbContext _db;

        public UserService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<User>> GetAll() 
        {
            return await _db.Users.Where(u => !u.IsDeleted).ToListAsync(); // فقط کاربران غیر حذف شده
        }

        public async Task<User?> GetById(int id)
        {
            return await _db.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted); // فقط کاربران غیر حذف شده
        }

        public async Task<User> Save(UserSaveDto dto)
        {
            if (dto.Id == 0)
            {
                var userExists = await _db.Users.AnyAsync(u => u.Username == dto.Username);
                if (userExists) return null;

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

                var user = new User
                {
                    Username = dto.Username,
                    PasswordHash = passwordHash,
                    Family = dto.Family,
                    Name = dto.Name,
                    IsActive = dto.IsActive,
                    SocialMedia1 = dto.SocialMedia1,
                    SocialMedia2 = dto.SocialMedia2,
                    Phone = dto.Phone1,
                };

                _db.Users.Add(user);
                await _db.SaveChangesAsync();
            }
            else
            {
                var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Id == user.Id && !u.IsDeleted);
                if (existingUser == null) return null;

                existingUser.Name = user.Name;
                existingUser.Family = user.Family;
                existingUser.Username = user.Username;
                existingUser.PasswordHash = user.PasswordHash;
                existingUser.IsActive = user.IsActive;
                existingUser.Phone = user.Phone;
                existingUser.SocialMediaId1 = user.SocialMediaId1;
                existingUser.SocialMediaId2 = user.SocialMediaId2;
            }

            await _db.SaveChangesAsync();
            return user;
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
