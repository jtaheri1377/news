using Microsoft.EntityFrameworkCore;
using news._02_Application.Interfaces;
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

        public async Task<List<NewsModel>> GetAll()
        {
            return await _db.News.Where(n => !n.IsDeleted).ToListAsync();
        }

        public async Task<NewsModel?> GetById(int id)
        {
            return await _db.News.FirstOrDefaultAsync(n => n.Id == id && !n.IsDeleted);
        }

        public async Task<NewsModel> Update(NewsModel news)
        {
            if (news.Id == 0)
            {
                // ایجاد خبر جدید
                _db.News.Add(news);
            }
            else
            {
                // ویرایش خبر
                var existingNews = await _db.News.FirstOrDefaultAsync(n => n.Id == news.Id && !n.IsDeleted);
                if (existingNews == null) return null;

                existingNews.Title = news.Title;
                existingNews.Description = news.Description;
                existingNews.Content = news.Content;
                existingNews.PublishedDate = news.PublishedDate;
                existingNews.ProvinceId = news.ProvinceId;
                existingNews.UnitId = news.UnitId;
            }

            await _db.SaveChangesAsync();
            return news;
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
