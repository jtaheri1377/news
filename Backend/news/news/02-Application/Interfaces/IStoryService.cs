using news._02_Application.Dto;

namespace news._02_Application.Interfaces
{
    public interface IStoryService
    {
        Task<List<StoryDto>> GetAll();
        Task<StoryDto?> Get(int id);
        Task<ParentChildDto> GetProvinceByStoryId(int id);
        Task<bool> Save(StorySaveDto Wise);
        Task<bool> Delete(int id);
    }

}
