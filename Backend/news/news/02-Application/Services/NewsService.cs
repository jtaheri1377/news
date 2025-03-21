﻿using Microsoft.EntityFrameworkCore;
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
                .Include(u=> u.Unit)
                .Include(s=>s.Subject)
                .Include(s=>s.Categories)
                .Where(n => !n.IsDeleted)
                .ToListAsync();
            return  Result.ToListDto();
        }
        
        public async Task<NewsModel?> GetById(int id)
        {
            return await _db.News.FirstOrDefaultAsync(n => n.Id == id && !n.IsDeleted);
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
            }
            else
            {
                // ویرایش خبر موجود
                news = await _db.News
                    .Include(n => n.Categories)
                    .Include(n => n.Medias)  // 🔹 حتماً مدیاها رو Include کن که مقدار قبلیشون پاک بشه
                    .FirstOrDefaultAsync(n => n.Id == dto.Id && !n.IsDeleted);
                if (news == null)
                    return null;

                NewsMapper.ToModel(dto, news);

                // به‌روزرسانی دسته‌بندی‌ها
                news.Categories = await _db.NewsCategories
                    .Where(c => dto.CategoryIds.Contains(c.Id) && !c.IsDeleted)
                    .ToListAsync();

                // 🔹 اضافه کردن این قسمت برای بروزرسانی مدیاها
                news.Medias = await _db.Medias
                    .Where(c => dto.MediaIds.Contains(c.Id) && !c.IsDeleted)
                    .ToListAsync();
            }

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
                .Include(p=>p.Province)
                .Include(u=>u.Unit)
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
                    Unit = n.Unit.Name
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
