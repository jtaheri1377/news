using news._01_Domain.Models_Entities_.Province;

namespace news._02_Application.Interfaces
{
    public interface IProvinceService
    {
        Task<List<ProvinceDto>> GetAllByToken();
        Task<List<ProvinceDto>> GetAll();
        Task<ProvinceDto?> GetById(int id);
        Task<List<ProvinceTreeDto>> GetTree();
        Task<List<ProvinceDto>> GetProvinces();
        Task<List<ProvinceDto>> GetCounties(int id);
        Task<ProvinceDto?> Save(ProvinceSaveDto dto);
        Task<bool> Delete(int id);
    }

}
