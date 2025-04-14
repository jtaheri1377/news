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
                .Include(s=>s.Province)
                .Include(s=>s.Medias)
                  .Where(u => !u.IsDeleted)
                  .OrderByDescending(s=>s.PublishedDate)
                  .ToListAsync();
            return list.ToListDto();
        }

        public async Task<StoryDto?> Get(int id)
        {
            var result= await _db.Stories
                .Where(u => u.Id == id && !u.IsDeleted)
                .FirstOrDefaultAsync();
            return result.ToDto();
        }

        public async Task<bool> Save(StorySaveDto story)
        {
            if (story.Id == 0)
            {
                var model = story.ToModel();  
                model.Medias= await _db.Medias
                    .Where(u => story.MediaIds.Contains(u.Id) && !u.IsDeleted)
                    .ToListAsync();


                _db.Stories.Add(model);
                await _db.SaveChangesAsync();
                return true;
            }
            else
            {
                var existingstory = await _db.Stories.FindAsync(story.Id);
                if (existingstory == null || existingstory.IsDeleted)
                    return false;


                var Medias = await _db.Medias
                  .Where(u => story.MediaIds.Contains(u.Id) && !u.IsDeleted)
                  .ToListAsync();

                existingstory.Title = story.Title;
                existingstory.Description = story.Description;
                existingstory.Medias = Medias;
                existingstory.ProvinceId = story.ProvinceId;
             }

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
