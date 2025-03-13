using news._01_Domain.Models_Entities_.Media;

namespace news._02_Application.Interfaces
{
    public interface IMediaService
    {
        Task<List<Media>> GetAll();
        Task<Media?> GetById(int id);
        Task<Media?> Update(Media media);
        Task<bool> Delete(int id);
    }
}
