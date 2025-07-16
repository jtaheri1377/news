namespace lms_dashboard._02_Application.Interfaces
{
    public interface ISmsService
    {
        public Task SendOtpAsync(string phoneNumber, string code);
        public Task SendNewPassword(string phoneNumber, string code);

    }
}
