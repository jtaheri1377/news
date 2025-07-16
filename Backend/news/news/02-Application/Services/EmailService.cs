using lms_dashboard._02_Application.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using news._03_Infrastructure.Repositories;

namespace lms_dashboard._02_Application.Services
{
    public class EmailService : IEmailService
    {
        public readonly NewsDbContext _db;
        private readonly IConfiguration _configuration;
        public EmailService(NewsDbContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }


        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_configuration["EmailSettings:SenderEmail"])); // ایمیل فرستنده
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message }; // می توانید از TextFormat.Plain برای متن ساده استفاده کنید

            using var smtp = new SmtpClient();
            try
            {
                await smtp.ConnectAsync(
                    _configuration["EmailSettings:SmtpHost"],
                    int.Parse(_configuration["EmailSettings:SmtpPort"]),
                    SecureSocketOptions.StartTls // یا SslOnConnect بسته به سرور
                );
                await smtp.AuthenticateAsync(
                    _configuration["EmailSettings:SmtpUser"],
                    _configuration["EmailSettings:SmtpPassword"]
                );
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
                Console.WriteLine($"✅ ایمیل با موفقیت برای {toEmail} ارسال شد.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ خطای ارسال ایمیل: {ex.Message}");
                // در محیط‌های واقعی، بهتر است خطا را لاگ (Log) کنید.
            }
        }
    }

}

