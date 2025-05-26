using Microsoft.EntityFrameworkCore;
using news._01_Domain.Wise;
using news._02_Application.Dto;
using news._02_Application.Dto.LoadMoreNewsResult;
using news._02_Application.Interfaces;
using news._02_Application.Mapper.WiseMapper;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class WiseService : IWiseService
    {
        private readonly NewsDbContext _db;

        public WiseService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<LazyLoadResponse<WiseDto>> GetAll(int skip, int take)
        {
            var list = await _db.Wises
                  .Where(u => !u.IsDeleted)
                  .OrderByDescending(w => w.Id)
                  .Skip(skip)
                  .Take(take)
                  .AsNoTracking()
                  .ToListAsync();

            int totalCount = await _db.Wises.CountAsync();
            bool HasMore = (skip + take) < totalCount;

            return new LazyLoadResponse<WiseDto>
            {
                List = list.ToListDto(),
                HasMore = HasMore

            };
        }

        public async Task<WiseDto?> Get(int id)
        {
            var result = await _db.Wises
                .Where(u => u.Id == id && !u.IsDeleted)
                .FirstOrDefaultAsync();
            return result.ToDto();
        }

        public async Task<WiseDto?> Save(WiseDto wise)
        {
            if (wise.Id == 0)
            {
                var model = wise.ToModel();
                _db.Wises.Add(model);
            }
            else
            {
                var existingwise = await _db.Wises.FindAsync(wise.Id);
                if (existingwise == null || existingwise.IsDeleted)
                    return null;

                existingwise.Name = wise.Name;
                existingwise.Description = wise.Description;
                existingwise.Translator = wise.Translator;
                existingwise.Author = wise.Author;
                existingwise.Img = wise.Img;
                existingwise.Language = wise.Language;
                existingwise.Subject = wise.Subject;
                existingwise.VolumeCount = wise.VolumeCount;
            }

            await _db.SaveChangesAsync();
            return wise;
        }

        public async Task<bool> Delete(int id)
        {
            var Wise = await _db.Wises.FindAsync(id);
            if (Wise == null || Wise.IsDeleted)
                return false;
            Wise.Delete();
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
