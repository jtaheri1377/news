
using news._01_Domain.Models_Entities_.User;

namespace news._02_Application
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(RegisterDto dto);
        Task<string?> LoginAsync(string username, string password);
    }

}
