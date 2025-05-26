using Microsoft.EntityFrameworkCore;
using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Media;
using news._02_Application.Dto.LoadMoreNewsResult;
using news._02_Application.Interfaces;
using news._02_Application.Mapper.News;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class SiteFileService : ISiteFileService
    {
        private readonly NewsDbContext _db;

        public SiteFileService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<SiteFileDto> Get(SiteFileType fileType)
        {
            var Result = await _db.SiteFiles
                .Where(x=>x.SiteFileType == fileType)
                .OrderByDescending(x=>x.Id)
                .FirstOrDefaultAsync();
            return  Result.ToDto();
        }
        
        public async Task<NewsDetailDto?> GetById(int id)
        {
            var result= await _db.News
                .Include(n=>n.NewsContent)
                .FirstOrDefaultAsync(n => n.Id == id && !n.IsDeleted);
            return result.ToDetailDto();
        }

        public async Task<SiteFile> Save(SiteFileSaveDto dto)
        {
            SiteFile SiteFile=new SiteFile();
            if (dto.Id == 0)
            {
                var media= await _db.Medias
                        .Where(n=>n.Id == dto.UploadId)
                        .FirstOrDefaultAsync();

                SiteFile= SiteFileMapper.ToModel(dto,media); 

                _db.SiteFiles.Add(SiteFile);

                await _db.SaveChangesAsync();

                //var content = new NewsContent
                //{
                //    Content = dto.Content,
                //    NewsModelId = news.Id,
                //};
                //_db.NewsContents.Add(content);
            }
            //else
            //{
            //    // ویرایش خبر موجود
            //    news = await _db.News
            //        .Include(n=>n.NewsContent)
            //        .Include(n => n.Categories)
            //        .Include(n => n.Medias)  // 🔹 حتماً مدیاها رو Include کن که مقدار قبلیشون پاک بشه
            //        .FirstOrDefaultAsync(n => n.Id == dto.Id && !n.IsDeleted);
            //    if (news == null)
            //        return null;

            //    NewsMapper.ToModel(dto, news);
              
                 
            //    NewsContent newsContent = news.NewsContent;
            //    newsContent.Content=dto.Content;
            //    _db.NewsContents.Update(newsContent);
            //    await _db.SaveChangesAsync();
                


            //    // به‌روزرسانی دسته‌بندی‌ها
            //    news.Categories = await _db.NewsCategories
            //        .Where(c => dto.CategoryIds.Contains(c.Id) && !c.IsDeleted)
            //        .ToListAsync();

            //    // 🔹 اضافه کردن این قسمت برای بروزرسانی مدیاها
            //    news.Medias = await _db.Medias
            //        .Where(c => dto.MediaIds.Contains(c.Id) && !c.IsDeleted)
            //        .ToListAsync();
            //}

            await _db.SaveChangesAsync();
            return SiteFile;
        }

        public async Task<LazyLoadResponse<NewsSummaryDto>> GetLatestNews(int categoryId, int skip, int take)
        {
            var query = _db.News
                .Where(n => !n.IsDeleted && n.Categories.Any(c => c.Id == categoryId))
                .OrderByDescending(n => n.PublishedDate);

            var totalCount = await query.CountAsync();

            var newsDtoList = await query
                .Include(p=>p.Province)
                .Include(s=>s.Subject)
                .Skip(skip)
                .Take(take)
                .Select(n => new NewsSummaryDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Description = n.Description,
                    PublishedDate = n.PublishedDate,
                    img=n.img,
                    Reviews = n.Reviews,
                    StudyTime = n.StudyTime,
                    Subject = n.Subject.Name,
                    Province = n.Province.Name,
                })
                .ToListAsync();

            bool hasMore = (skip + take) < totalCount;

            return new LazyLoadResponse<NewsSummaryDto>
            {
                List = newsDtoList,
                HasMore = hasMore
            };
        }

        public async Task<bool> Delete(int id)
        {
            var news = await _db.News.FirstOrDefaultAsync(n => n.Id == id && !n.IsDeleted);
            if (news == null) return false;

            news.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }

}
