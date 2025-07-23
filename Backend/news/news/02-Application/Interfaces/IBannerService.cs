using news._02_Application.Dto.LoadMoreNewsResult;

namespace news._02_Application.Interfaces
{
    public interface IBannerService
    {
        Task<List<BannerDto>> Get(int CategoryCode);
        Task<Banner?> Save(BannerSaveDto dto);
        Task<bool> Delete(int id);


        //Task<LazyLoadResponse<NewsSummaryDto>> GetLatestNews(int categoryId, int skip, int take);
        //Task<List<NewsSummaryDto>> GetAll();
        //Task<NewsDetailDto?> GetBy(int id);
        //Task<NewsModel?> Save(NewsSaveDto newsDto);
        //Task<bool> Delete(int id);
    }
}
