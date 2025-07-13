using lms_dashboard._01_Domain.Model;
using lms_dashboard._02_Application.Interfaces;
using lms_dashboard._02_Application.Mapper;
using Microsoft.EntityFrameworkCore;
using news._03_Infrastructure.Repositories;
using System.Linq;

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

        //public async Task<List<PermissionDto>> GetListByMajorId(int MajorId)
        //{
        //    var major = await _db.Majors
        //        .Include(x => x.Children)
        //        .Where(x => x.IsDeleted == false && MajorId==x.Id)
        //        .ToListAsync();

        //    var result = await _db.Permissions
        //        .Include(x=>x.Majors)
        //        .Where(x => !x.IsDeleted && major.Any(m=>m.Id==x.Id))
        //        .ToListAsync();

        //    return result.ToListDto();
        //}

        public async Task<PermissionDto> Get(int id)
        {
            var result = await _db.Permissions
                //.Where(x => x.Id == id && x.IsDeleted == false)
                .FirstOrDefaultAsync();
            if (result == null)
                throw new Exception("موردی یافت نشد!");

            return result.ToDto();
        }

        public async Task Save(PermissionDto dto)
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


                result.Id=dto.Id;
                
                result.Name = dto.Name;
              
             
                _db.Permissions.Update(result);
                await _db.SaveChangesAsync();
            }
        }


        public async Task Delete(int id)
        {
            var result = await _db.Permissions
                .Where(x => x.Id == id )
                //.Where(x => x.Id == id && x.IsDeleted == false)
                .FirstOrDefaultAsync();
            if (result == null)
                throw new Exception("موردی یافت نشد!");

            _db.Remove(result);
            await _db.SaveChangesAsync();

        }

    }
}
