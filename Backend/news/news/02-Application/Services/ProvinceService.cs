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
            return await _db.Provinces
                .Where(p => !p.IsDeleted)
                .ToListAsync();
        }

        public async Task<Province?> GetById(int id)
        {
            return await _db.Provinces
                .Where(p => p.Id == id && !p.IsDeleted)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Province>> GetTree()
        {
            return await _db.Provinces
                .Where(p => p.ParentId == null && !p.IsDeleted)
                .Include(p => p.Children.Where(c => !c.IsDeleted))
                .ToListAsync();
        }

        public async Task<Province?> Update(Province province)
        {
            if (province.Id==0)
            {
                _db.Provinces.Add(province);
            }
            else
            {
                var existingProvince = await _db.Provinces.FindAsync(province.Id);
                if (existingProvince == null || existingProvince.IsDeleted)
                    return null;

                existingProvince.Name = province.Name;
                existingProvince.ParentId = province.ParentId;
            }

            await _db.SaveChangesAsync();
            return province;
        }

        public async Task<bool> Delete(int id)
        {
            var province = await _db.Provinces.FindAsync(id);
            if (province == null || province.IsDeleted)
                return false;

            province.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
