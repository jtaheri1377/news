using Microsoft.EntityFrameworkCore;
using news._02_Application.Dto;
using news._02_Application.Dto.LoadMoreNewsResult;
using news._02_Application.Interfaces;
using news._02_Application.Mapper.News;
using news._03_Infrastructure.Repositories;

namespace news._02_Application.Services
{
    public class NewsService : INewsService
    {
        private readonly NewsDbContext _db;

        public NewsService(NewsDbContext db)
        {
            _db = db;
        }

        public async Task<List<NewsSummaryDto>> GetAll()
        {
            var Result = await _db.News
                .Include(n=>n.Province)
                .Include(s=>s.Subject)
                .Include(s=>s.Categories)
                .Where(n => !n.IsDeleted)
                .ToListAsync();
            return  Result.ToListDto();
        }
        
        public async Task<NewsDetailDto?> GetById(int id)
        {
            var result= await _db.News
                .Include(n=>n.NewsContent)
                .Include(n=>n.Province)
                .Include(n=>n.Subject)
                .Include(n=>n.Medias)
                .FirstOrDefaultAsync(n => n.Id == id && !n.IsDeleted);
            return result.ToDetailDto();
        }

        public async Task<ParentChildDto> GetProvinceByNewsId(int id)
        {
            var result = await _db.News
                .Include(s => s.Province)
                .ThenInclude(ss => ss.Parent)
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

        public async Task<ParentChildDto> GetNewsCategoryBynewsId(int id)
        {
            var result = await _db.News
                .Include(s => s.Categories)
                .ThenInclude(ss => ss.Parent)
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync();
            return new ParentChildDto
            {
                Child = result.Categories.FirstOrDefault()?.Name,
                ChildId = result.Categories.FirstOrDefault()?.Id,
                Parent = result.Categories.FirstOrDefault()?.Parent?.Name,
                ParentId = result.Categories.FirstOrDefault()?.ParentId
            };
        }

        public async Task<NewsModel?> Save(NewsSaveDto dto)
        {
            NewsModel news;
            if (dto.Id == 0)
            {
                
                // ایجاد خبر جدید
                news = NewsMapper.ToModel(dto);
                news.Categories = await _db.NewsCategories
                    .Where(c => dto.CategoryIds.Contains(c.Id) && !c.IsDeleted)
                    .ToListAsync();
                news.Medias = await _db.Medias
                    .Where(c => dto.MediaIds.Contains(c.Id) && !c.IsDeleted)
                    .ToListAsync();
                 

                _db.News.Add(news);

                await _db.SaveChangesAsync();

                var content = new NewsContent
                {
                    Content = dto.Content,
                    NewsModelId = news.Id,
                };
                _db.NewsContents.Add(content);
            }
            else
            {
                // ویرایش خبر موجود
                news = await _db.News
                    .Include(n=>n.NewsContent)
                    .Include(n => n.Categories)
                    .Include(n => n.Medias)  // 🔹 حتماً مدیاها رو Include کن که مقدار قبلیشون پاک بشه
                    .FirstOrDefaultAsync(n => n.Id == dto.Id && !n.IsDeleted);
                if (news == null)
                    return null;

                NewsMapper.ToModel(dto, news);
              
                 
                NewsContent newsContent = news.NewsContent;
                newsContent.Content=dto.Content;
                _db.NewsContents.Update(newsContent);
                await _db.SaveChangesAsync();
                


                // به‌روزرسانی دسته‌بندی‌ها
                news.Categories = await _db.NewsCategories
                    .Where(c => dto.CategoryIds.Contains(c.Id) && !c.IsDeleted)
                    .ToListAsync();

                // 🔹 اضافه کردن این قسمت برای بروزرسانی مدیاها
                news.Medias = await _db.Medias
                    .Where(c => dto.MediaIds.Contains(c.Id) && !c.IsDeleted)
                    .ToListAsync();
            }

            // مدیاهای مربوط به این خبر را به این خبر لینک کن
            await _db.Medias
                .Where(c => dto.MediaIds.Contains(c.Id) && !c.IsDeleted)
                .ExecuteUpdateAsync(m => m
                    .SetProperty(x => x.NewsModelId, x => news.Id)
                );

            await _db.SaveChangesAsync();
            return news;
        }


        public async Task<LazyLoadResponse<NewsSummaryDto>> GetLatestNews(int categoryId, int skip, int take)
        {
            var query = _db.News
                .Where(n => !n.IsDeleted && n.Categories.Any(c => c.Id == categoryId))
                .OrderByDescending(n => n.PublishedDate);

            var totalCount = await query.CountAsync();

            var newsDtoList = await query
                .Include(p => p.Province)
                .Include(s => s.Subject)
                .Skip(skip)
                .Take(take)
                .OrderByDescending(n => n.Id)
                .ToListAsync();

            bool hasMore = (skip + take) < totalCount;

            return new LazyLoadResponse<NewsSummaryDto>
            {
                List = newsDtoList.ToListDto(),
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
