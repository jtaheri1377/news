using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Province;
using news._02_Application.Interfaces;
using news._02_Application.Mapper.ProvinceMapper;
using news._03_Infrastructure.Repositories;

namespace news._02_Application
{
    public class ProvinceService : IProvinceService
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

        public async Task<List<ProvinceTreeDto>> GetTree()
        {
            var result= await _db.Provinces
                .Where(p => p.ParentId == null && !p.IsDeleted)
                .Include(p => p.Children.Where(c => !c.IsDeleted))
                .ToListAsync();
            return result.ToTreeListDto();
        }

        public async Task<List<ProvinceDto>> GetProvinces()
        {
            var result = await _db.Provinces
                .Where(p => p.ParentId == null && !p.IsDeleted)
                .ToListAsync();
            return result.ToListDto();
        }

        public async Task<List<ProvinceDto>> GetCounties(int id)
        {
            var result = await _db.Provinces
                .Where(p => p.ParentId == id && !p.IsDeleted)
                .ToListAsync();
            return result.ToListDto();

        }

        public async Task<ProvinceDto?> Save(ProvinceSaveDto dto)
        {
            Province province=new Province();
            if (dto.Id == 0)
            {
                province=dto.ToModel();
                province.Parent = await _db.Provinces
                    .Where(p => p.Id == dto.ParentId)
                    .FirstOrDefaultAsync();
                _db.Provinces.Add(province);
            }
            else
            {
                province = await _db.Provinces.FindAsync(dto.Id);
                if (province == null || province.IsDeleted)
                    return null;

                province.Name = dto.Name;
                province.ParentId = dto.ParentId;
            }

            await _db.SaveChangesAsync();
            return province.ToDto();
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
