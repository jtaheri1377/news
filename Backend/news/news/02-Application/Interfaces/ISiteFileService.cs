using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Media;
using news._02_Application.Dto.LoadMoreNewsResult;

namespace news._02_Application.Interfaces
{
    public interface ISiteFileService
    {
        Task<SiteFileDto> Get(SiteFileType fileType);
        Task<SiteFile?> Save(SiteFileSaveDto dto);

        //Task<LazyLoadResponse<NewsSummaryDto>> GetLatestNews(int categoryId, int skip, int take);
        //Task<List<NewsSummaryDto>> GetAll();
        //Task<NewsDetailDto?> GetBy(int id);
        //Task<NewsModel?> Save(NewsSaveDto newsDto);
        //Task<bool> Delete(int id);
    }
}
