using news._02_Application.Dto.LoadMoreNewsResult;

namespace news._02_Application.Interfaces
{
    public interface INewsService
    {
        Task<LazyLoadResponse<NewsSummaryDto>> GetLatestNews(int categoryId, int skip, int take);
        Task<List<NewsSummaryDto>> GetAll();
        Task<NewsModel?> GetById(int id);
        Task<NewsModel?> Save(NewsSaveDto newsDto);
        Task<bool> Delete(int id);
    }
}
