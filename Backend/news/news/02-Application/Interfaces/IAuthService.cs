using news._01_Domain.Models_Entities_.User;

namespace news._02_Application.Interfaces
{
    public interface IAuthService
    {
        string GenerateToken(User user);
        User Authenticate(string username, string password);
    }

}
