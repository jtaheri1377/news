using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Story;
using news._02_Application.Dto;
using news._02_Application.Interfaces;
using news._02_Application.Mapper.StoryMapper;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class StoryService : IStoryService
    {
        private readonly NewsDbContext _db;

        public StoryService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<StoryDto>> GetAll()
        {
            var list = await _db.Stories
                .Include(s => s.Province)
                .Include(s => s.Medias)
                  .Where(u => !u.IsDeleted)
                  .OrderByDescending(s => s.PublishedDate)
                  .ToListAsync();
            return list.ToListDto();
        }

        public async Task<StoryDto?> Get(int id)
        {
            var result = await _db.Stories
                .Where(u => u.Id == id && !u.IsDeleted)
                .FirstOrDefaultAsync();
            return result.ToDto();
        }

      public async  Task<ParentChildDto> GetProvinceByStoryId(int id)
        {
            var result = await _db.Stories
                .Include (s => s.Province)
                .ThenInclude(ss=>ss.Parent)
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync();
            return new ParentChildDto
            {
                Child = result.Province.Name,
                ChildId = result.Province.Id,
                Parent = result.Province.Parent?.Name,
                ParentId = result.Province.ParentId
            };
        }

        public async Task<bool> Save(StorySaveDto story)
        {
            var model = await _db.Stories
                .Include(s => s.Medias)
                .FirstOrDefaultAsync(s => s.Id == story.Id && !s.IsDeleted);

            if (model == null && story.Id != 0)
                return false;

            model ??= story.ToModel();
            model.Title = story.Title;
            model.ProvinceId = story.ProvinceId;

            var mediaIds = story.MediaIds?.Distinct().ToList() ?? new();

            model.Medias = await _db.Medias
                .Where(m => mediaIds.Contains(m.Id) && !m.IsDeleted)
                .ToListAsync();

            if (story.Id == 0)
                _db.Stories.Add(model);

            await _db.SaveChangesAsync();
            return true;
        }




        public async Task<bool> Delete(int id)
        {
            var Story = await _db.Stories.FindAsync(id);
            if (Story == null || Story.IsDeleted)
                return false;
            Story.Delete();
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
