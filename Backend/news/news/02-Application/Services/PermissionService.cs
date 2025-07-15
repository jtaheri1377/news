using lms_dashboard._02_Application.Interfaces;
using lms_dashboard._02_Application.Mapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Province;
using news._02_Application.Mapper.ProvinceMapper;
using news._03_Infrastructure.Repositories;

namespace lms_dashboard._02_Application.Services
{
    public class PermissionService : IPermissionService
    {
        public readonly NewsDbContext _db;

        private readonly IHttpContextAccessor _httpContextAccessor;
        public PermissionService(NewsDbContext db, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<PermissionSummaryDto>> GetAllByToken()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst("uid");

            if (userIdClaim == null)
                throw new UnauthorizedAccessException("کاربر احراز هویت نشده یا شناسه کاربری در سیستم یافت نشد.");

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new ArgumentException("فرمت شناسه کاربری نامعتبر است.");
            }

            var permissions = await _db.Users
                .Where(x => x.Id == userId)
                .Include(x => x.Roles)
                .ThenInclude(xx => xx.Permissions)
                .SelectMany(p => p.Roles.SelectMany(pp => pp.Permissions))
                .ToListAsync();

            var resultDto = permissions.Select(p => new PermissionSummaryDto 
            {
                Id = p.Id,
                Name = p.Name,
                Title=p.Title
            }).ToList();

            return resultDto; 
        }

        public async Task<List<PermissionDto>> GetAll() 
        {        
            var permissions = await _db.Permissions
                .Include(x => x.Children)
                .ThenInclude(xx => xx.Children)
                .ToListAsync();

            return permissions.ToListDto();  
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
              .Where(x => x.Id == dto.Id )
              .FirstOrDefaultAsync();
                if (result == null)
                    throw new Exception("موردی یافت نشد!");


                result.Id = dto.Id;
                result.Title = dto.Title;
                result.IsSelected = dto.IsSelected;
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
