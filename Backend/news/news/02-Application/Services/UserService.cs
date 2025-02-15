using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.User;
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

        public async Task<User> Update(User user)
        {
            if (user.Id == 0)
            {
                _db.Users.Add(user);  // اگر Id نداشته باشد، جدید اضافه می‌شود.
            }
            else
            {
                var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Id == user.Id && !u.IsDeleted);
                if (existingUser == null) return null;

                existingUser.Name = user.Name;
                existingUser.Family = user.Family;
                existingUser.UserName = user.UserName;
                existingUser.PasswordHash = user.PasswordHash;
                existingUser.UserType = user.UserType;
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
