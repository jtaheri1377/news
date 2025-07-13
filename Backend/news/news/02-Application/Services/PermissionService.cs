using lms_dashboard._02_Application.Interfaces;
using lms_dashboard._02_Application.Mapper;
using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Province;
using news._02_Application.Mapper.ProvinceMapper;
using news._03_Infrastructure.Repositories;

namespace lms_dashboard._02_Application.Services
{
    public class PermissionService : IPermissionService
    {
        public readonly NewsDbContext _db;
        public PermissionService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<PermissionDto>> GetAll()
        {
            var result = await _db.Permissions
                //.Where(x => x.IsDeleted == false )
                .ToListAsync();

            return result.ToListDto();
        }

        public async Task<ProvinceDto?> Save(ProvinceSaveDto dto)
        {
            Province province = new Province();
            if (dto.Id == 0)
            {
                province = dto.ToModel();
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


        public async Task<List<PermissionDto>> GetTree()
        {
            var result = await _db.Permissions
                .Where(p => p.ParentId == null)
                .Include(p => p.Children)
                .ThenInclude(pp => pp.Children)
                .ToListAsync();
            return result.ToListDto();
        }






        public async Task<PermissionDto> Get(int id)
        {
            var result = await _db.Permissions
                //.Where(x => x.Id == id && x.IsDeleted == false)
                .FirstOrDefaultAsync();
            if (result == null)
                throw new Exception("موردی یافت نشد!");

            return result.ToDto();
        }

        public async Task Save(PermissionSaveDto dto)
        {
            if (dto == null) throw new Exception("داده ی مورد نظر معتبر نمی باشد!");
            if (dto.Id == 0)
            {
                var model = new Permission();
                model = dto.ToModel();

                _db.Permissions.Add(model);
                await _db.SaveChangesAsync();
            }
            else
            {
                var result = await _db.Permissions
              //.Where(x => x.Id == dto.Id && x.IsDeleted == false)
              .FirstOrDefaultAsync();
                if (result == null)
                    throw new Exception("موردی یافت نشد!");


                result.Id = dto.Id;

                result.Name = dto.Name;


                _db.Permissions.Update(result);
                await _db.SaveChangesAsync();
            }
        }


        public async Task Delete(int id)
        {
            var result = await _db.Permissions
                .Where(x => x.Id == id)
                //.Where(x => x.Id == id && x.IsDeleted == false)
                .FirstOrDefaultAsync();
            if (result == null)
                throw new Exception("موردی یافت نشد!");

            _db.Remove(result);
            await _db.SaveChangesAsync();

        }

    }
}
