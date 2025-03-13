using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Media;
using news._02_Application.Interfaces;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class MediaService : IMediaService
    {
        private readonly NewsDbContext _db;

        public MediaService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<Media>> GetAll()
        {
            return await _db.Medias
                .Where(m => !m.IsDeleted)
                .ToListAsync();
        }

        public async Task<Media?> GetById(int id)
        {
            return await _db.Medias
                .Where(m => m.Id == id && !m.IsDeleted)
                .FirstOrDefaultAsync();
        }

        public async Task<Media?> Update(Media media)
        {
            if (media.Id == 0)
            {
                _db.Medias.Add(media);
            }
            else
            {
                var existingMedia = await _db.Medias.FindAsync(media.Id);
                if (existingMedia == null || existingMedia.IsDeleted)
                    return null;

                existingMedia.Url = media.Url;
                existingMedia.Alt = media.Alt;
                existingMedia.Title = media.Title;
                existingMedia.NewsModelId = media.NewsModelId;
            }

            await _db.SaveChangesAsync();
            return media;
        }

        public async Task<bool> Delete(int id)
        {
            var media = await _db.Medias.FindAsync(id);
            if (media == null || media.IsDeleted)
                return false;

            media.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}