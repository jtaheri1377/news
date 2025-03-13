
using news._01_Domain.Wise;
using news._02_Application.Dto;

namespace news._02_Application.Interfaces
{
    public interface IWiseService
    {
        Task<List<WiseDto>> GetAll();
        Task<WiseDto?> Get(int id);
        Task<WiseDto?> Save(WiseDto Wise);
        Task<bool> Delete(int id);
    }
}
