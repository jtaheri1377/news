using news._01_Domain.Models_Entities_.Province;

namespace news._02_Application.Interfaces
{
    public interface IProvinceService
    {
        Task<List<Province>> GetAll();
        Task<Province?> GetById(int id);
        Task<List<Province>> GetTree();
        Task<Province?> Update(Province province);
        Task<bool> Delete(int id);
    }

}
