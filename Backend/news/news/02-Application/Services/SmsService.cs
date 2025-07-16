using lms_dashboard._01_Domain.Model;
using lms_dashboard._02_Application.Interfaces;
using Microsoft.Extensions.Options;
using news._03_Infrastructure.Repositories;
using System.Web;

namespace lms_dashboard._02_Application.Services
{
    public class SmsService : ISmsService
    {
        public readonly HttpClient _httpClient;
        public readonly NewsDbContext _db;
        private readonly string _apiKey;
        public SmsService(NewsDbContext db, HttpClient httpClient, IOptions<SmsSettings> options)
        {
            _db = db;
            _httpClient = httpClient;
            _apiKey = options.Value.ApiKey;
        }

        public async Task SendNewPassword(string phoneNumber, string code)
        {
            string message = $"آموزش عالی دارالحکمه\nکد جدید ورود: {code}\nلطفا این کد را در اختیار هیچ‌کس قرار ندهید";
            string encodedMessage = HttpUtility.UrlEncode(message);

            var url = $"https://api.kavenegar.com/v1/{_apiKey}/sms/send.json" +
                      $"?receptor={phoneNumber}" +
                      $"&message={encodedMessage}" +
                      $"&tag=LoginCode";

            try
            {
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"❌ ارسال پیامک ناموفق بود: {error}");
                }
                else
                {
                    Console.WriteLine($"✅ پیامک با موفقیت برای {phoneNumber} ارسال شد.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ خطای ارسال پیامک: {ex.Message}");
            }
        }

        public async Task SendOtpAsync(string phoneNumber, string code)
        {
            string message = $"آموزش عالی دارالحکمه\nکد ورود: {code}\nلطفا این کد را در اختیار هیچ‌کس قرار ندهید";
            string encodedMessage = HttpUtility.UrlEncode(message);

            var url = $"https://api.kavenegar.com/v1/{_apiKey}/sms/send.json" +
                      $"?receptor={phoneNumber}" +
                      $"&message={encodedMessage}" +
                      $"&tag=LoginCode";

            try
            {
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"❌ ارسال پیامک ناموفق بود: {error}");
                }
                else
                {
                    Console.WriteLine($"✅ پیامک با موفقیت برای {phoneNumber} ارسال شد.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ خطای ارسال پیامک: {ex.Message}");
            }
        }

      
    }
}
