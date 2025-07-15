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
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProvinceService(NewsDbContext db, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
        }

        private int _getUserIdFromToken()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst("uid");

            if (userIdClaim == null)
                throw new UnauthorizedAccessException("کاربر احراز هویت نشده یا شناسه کاربری در سیستم یافت نشد.");

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new ArgumentException("فرمت شناسه کاربری نامعتبر است.");
            }

            return userId;
        }

        public async Task<List<ProvinceDto>> GetAllByToken()
        {
            
           int userId= _getUserIdFromToken();

            var provinces = await _db.Users
                .Where(x => x.Id == userId)
                .Include(x => x.Roles)
                .ThenInclude(xx => xx.Provinces)
                .SelectMany(p => p.Roles.SelectMany(pp => pp.Provinces))
                .ToListAsync();

            var resultDto = provinces.Select(p => new ProvinceDto
            {
                Id = p.Id,
                Name = p.Name,
            }).ToList();

            return resultDto;
        }

        public async Task<List<ProvinceDto>> GetAll()
        {
            var result= await _db.Provinces
                .Where(p => !p.IsDeleted)
                .ToListAsync();

            return result.ToListDto();
        }

        public async Task<ProvinceDto?> GetById(int id)
        {
            var result= await _db.Provinces
                .Where(p => p.Id == id && !p.IsDeleted)
                .FirstOrDefaultAsync();
            return result.ToDto();
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
