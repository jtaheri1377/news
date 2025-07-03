using news._01_Domain.Models_Entities_.User;

namespace news._02_Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
        Task<User?> GetById(int id);
        Task<User> Save(User user);
        Task<bool> Delete(int id);
    }
}
