using lms_dashboard._01_Domain.Model;
using lms_dashboard._02_Application.Interfaces;
using lms_dashboard._02_Application.Mapper;
using Microsoft.EntityFrameworkCore;
using news._03_Infrastructure.Repositories;

namespace lms_dashboard._02_Application.Services
{
    public class RoleService : IRoleService
    {
        public readonly NewsDbContext _db;
        public RoleService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<RoleDto>> GetAll()
        {
            var result = await _db.Roles
                .Include(x => x.Permissions)
                .ToListAsync();

            return result.ToListDto();
        }

        //public async Task<List<RoleDto>> GetListByMajorId(int MajorId)
        //{
        //    var major = await _db.Majors
        //        .Include(x => x.Children)
        //        .Where(x => x.IsDeleted == false && MajorId==x.Id)
        //        .ToListAsync();

        //    var result = await _db.Roles
        //        .Include(x=>x.Majors)
        //        .Where(x => !x.IsDeleted && major.Any(m=>m.Id==x.Id))
        //        .ToListAsync();

        //    return result.ToListDto();
        //}

        public async Task<RoleDto> Get(int id)
        {
            var result = await _db.Roles
                .Include(r => r.Permissions)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
            if (result == null)
                throw new Exception("موردی یافت نشد!");

            return result.ToDto();
        }

        public async Task Save(RoleSaveDto dto)
        {
            if (dto == null) throw new Exception("داده ی مورد نظر معتبر نمی باشد!");
            if (dto.Id == 0)
            {
                var model = new Role();
                model = dto.ToModel();

                //add permissions
                if (dto.PermissionIds != null && dto.PermissionIds.Any())
                {
                    var permissions = await _db.Permissions
                    .Where(p => dto.PermissionIds.Contains(p.Id))
                    .ToListAsync();

                    model.Permissions = permissions;
                }


                _db.Roles.Add(model);
                await _db.SaveChangesAsync();
            }
            else
            {
                var result = await _db.Roles
                    .Include(c => c.Permissions)
                     .Where(x => x.Id == dto.Id)
                      .FirstOrDefaultAsync();
                if (result == null)
                    throw new Exception("موردی یافت نشد!");


                result.Id = dto.Id;

                result.Name = dto.Name;

                result.Permissions.Clear();
                if (dto.PermissionIds != null && dto.PermissionIds.Any())
                {
                    var permissions = await _db.Permissions
                        .Where(p => dto.PermissionIds.Contains(p.Id))
                        .ToListAsync();
                    result.Permissions = permissions;
                }

                _db.Roles.Update(result);
                await _db.SaveChangesAsync();
            }
        }


        public async Task Delete(int id)
        {
            var result = await _db.Roles
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
            if (result == null)
                throw new Exception("موردی یافت نشد!");

            _db.Remove(result);
            await _db.SaveChangesAsync();

        }

    }
}
