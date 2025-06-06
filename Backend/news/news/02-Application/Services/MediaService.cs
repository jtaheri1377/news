using Microsoft.EntityFrameworkCore;
using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Media;
using news._02_Application.Dto;
using news._02_Application.Dto.LoadMoreNewsResult;
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

        public async Task<LazyLoadResponse<GalleryDto>> GetGallery(int skip, int take)
        {

            // دریافت و مرتب‌سازی تمامی مدیاها
            var allMedias = await _db.Medias
                .Where(m => !m.IsDeleted && (m.FileType=="Image"|| m.FileType == "Video"))
                .Include(m => m.NewsModel)
                    .ThenInclude(c=>c.Categories)
                .Include(m => m.NewsModel)
                    .ThenInclude(nm => nm.Province)
                .Include(m => m.Story)
                    .ThenInclude(p=>p.Province)
                .AsNoTracking()
                .OrderByDescending(m => m.UploadDate)
                .ToListAsync();

            // گروه‌بندی مدیاهایی که به یک استوری یا خبر متصل هستند
            var groupedMedias = allMedias
                .Where(m => m.NewsModelId.HasValue || m.StoryId.HasValue)
                .GroupBy(m => new { m.NewsModelId, m.StoryId })
                .Select(g => new
                {
                    
                    g.Key.NewsModelId,
                    g.Key.StoryId,
                    Medias = g.OrderByDescending(m => m.UploadDate).ToList()
                });

            // دریافت مدیاهایی که مستقل هستند
            //var independentMedias = 
                //allMedias
                //.Where(m => !m.NewsModelId.HasValue && !m.StoryId.HasValue)
                //.Select(m => new
                //{
                    
                //    NewsModelId = (int?)null,
                //    StoryId = (int?)null,
                //    Medias = new List<Media> { m }
                //});

            // ترکیب، مرتب‌سازی و صفحه‌بندی
            var finalList = groupedMedias
                //.Concat(independentMedias)
                .OrderByDescending(g => g.Medias.Max(m => m.UploadDate))
                .Skip(skip)
                .Take(take)
                .ToList();

            // تبدیل به DTO
            var finalGalleryList = finalList.Select(g =>
            {
                var firstMedia = g.Medias.FirstOrDefault();

                return new GalleryDto
                {
                    Id = firstMedia?.Id ?? 0,
                    Medias = g.Medias.Select(m => new MediaGalleryDto
                    {
                        Id = m.Id,
                        Alt = m.Alt,
                        FileUrl = m.FileUrl,
                        FileType = m.FileType,
                        Duration = m.Duration,
                        ThumbnailUrl = m.ThumbnailUrl,
                        UploadDate = m.UploadDate
                    }).ToList(),
                    Type = g.NewsModelId.HasValue ? GalleryType.News :
                                  g.StoryId.HasValue ? GalleryType.Story :
                                                       GalleryType.Other,
                    Title = firstMedia?.NewsModel?.Title ?? firstMedia?.Story?.Title ?? "",
                    Description = firstMedia?.NewsModel?.Description ?? firstMedia?.Story?.Description ?? string.Empty,
                    Reviews = 0,
                    PublishedDate = TimeZoneInfo.ConvertTimeFromUtc(
                                    firstMedia?.NewsModel?.PublishedDate ??
                                   firstMedia.Story?.PublishedDate ?? new DateTime(),
                                   TimeZoneInfo.FindSystemTimeZoneById("Iran Standard Time")
                                   ),
                    StudyTime = firstMedia?.NewsModel?.StudyTime ?? "",
                    Province = firstMedia?.NewsModel?.Province?.Name ?? firstMedia?.Story?.Province?.Name  ??"",
                    NewsModelId = g.NewsModelId,
                    CategoryId = firstMedia.NewsModel?.Categories?.FirstOrDefault()?.Id,
                    StoryId = g.StoryId
                };
            }).ToList();

            

            var TotalCount = await _db.Medias
               .Where(m => !m.IsDeleted).CountAsync();

            bool HasMore = (skip + take) < TotalCount;
            return new LazyLoadResponse<GalleryDto>
            {
                List = finalGalleryList,
                HasMore = HasMore,
            };
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

                //existingMedia.Url = media.Url;
                existingMedia.Alt = media.Alt;
                //existingMedia.Title = media.Title;
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