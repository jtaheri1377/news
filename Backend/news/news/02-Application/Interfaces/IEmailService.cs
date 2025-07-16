using lms_dashboard._01_Domain.Model;

namespace lms_dashboard._02_Application.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string message);
    }
}
