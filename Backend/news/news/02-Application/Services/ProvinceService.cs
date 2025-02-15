using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Province;
using news._02_Application.Interfaces;
using news._03_Infrastructure.Repositories;

namespace news._02_Application
{
    public class ProvinceService: IProvinceService
    {
        private readonly NewsDbContext _db;

        public ProvinceService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<Province>> GetAll()
        {
            return await _db.Provinces.Where(p => !p.IsDeleted).ToListAsync(); // فقط استان‌های غیر حذف شده را بیاوریم
        }

        public async Task<Province?> GetById(int id)
        {
            return await _db.Provinces.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted); // چک می‌کنیم که حذف نشده باشد
        }

        public async Task<Province> Update(Province province)
        {
            if (province.Id == 0)
            {
                _db.Provinces.Add(province);  // اگر Id نداشته باشد، جدید اضافه می‌شود.
            }
            else
            {
                var existingProvince = await _db.Provinces.FirstOrDefaultAsync(p => p.Id == province.Id && !p.IsDeleted);
                if (existingProvince == null) return null;

                existingProvince.Name = province.Name;
                existingProvince.City = province.City;
                existingProvince.Region = province.Region;
            }

            await _db.SaveChangesAsync();
            return province;
        }

        public async Task<bool> Delete(int id)
        {
            var province = await _db.Provinces.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
            if (province == null) return false;

            province.IsDeleted = true;  // حذف منطقی
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
