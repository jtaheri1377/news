
using news._01_Domain.Models_Entities_.NewsCategory;
using news._01_Domain.Wise;
using news._02_Application.Dto;

namespace news._02_Application.Interfaces
{
    public interface INewsCategoryService
    {
        Task<List<NewsCategoryDto>> GetAll();
        Task<List<NewsCategoryDto>> GetParents();
        Task<List<NewsCategoryDto>> GetChilds(int id);
        Task<NewsCategoryDto?> Get(int id);
        Task<NewsCategoryDto?> Save(NewsCategoryDto categoryDto);
        Task<bool> Delete(int id);
    }


}
