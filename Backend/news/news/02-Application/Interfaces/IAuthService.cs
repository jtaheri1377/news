
using lms_dashboard._01_Domain.Model;
using news._01_Domain.Models_Entities_.User;

namespace news._02_Application
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(RegisterDto dto);
        Task<string?> LoginAsync(string username, string password);
        public Task ResetPasswordBySms(ResetPasswordDto dto);
        public Task ResetPasswordByEmail(ResetPasswordByEmailDto dto);
        public Task ChangePassword(ChangePasswordDto dto);
    }

}
