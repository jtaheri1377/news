
using news._01_Domain.Wise;
using news._02_Application.Dto;
using news._02_Application.Dto.LoadMoreNewsResult;

namespace news._02_Application.Interfaces
{
    public interface IWiseService
    {
        Task<LazyLoadResponse<WiseDto>> GetAll(int skip, int take);
        Task<WiseDto?> Get(int id);
        Task<WiseDto?> Save(WiseDto Wise);
        Task<bool> Delete(int id);
    }
}
