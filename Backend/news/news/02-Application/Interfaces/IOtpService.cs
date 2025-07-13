namespace lms_dashboard._02_Application.Interfaces
{
    public interface IOtpService
    {
        public Task SendOtpAsync(string phoneNumber);
        public Task<bool> VerifyOtpAsync(string phoneNumber, string code);
    }
}
