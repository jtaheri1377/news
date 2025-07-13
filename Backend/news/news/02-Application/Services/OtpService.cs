using lms_dashboard._01_Domain.Model;
using lms_dashboard._02_Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using news._03_Infrastructure.Repositories;


namespace lms_dashboard._02_Application.Services
{
    public class OtpService :  BackgroundService, IOtpService
    {
        private readonly NewsDbContext _db;
        private readonly IServiceProvider _services;
        private readonly ISmsService _smsService;
        private readonly Random _random = new();

        public OtpService(NewsDbContext db, IServiceProvider services, ISmsService smsService)
        {
            _db = db;
            _services = services;
            _smsService = smsService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _services.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<NewsDbContext>();

                var expiredOtps = await db.OtpCodes
                    .Where(x => x.IsUsed || x.ExpirationTime < DateTime.UtcNow)
                    .ToListAsync();

                if (expiredOtps.Any())
                {
                    db.OtpCodes.RemoveRange(expiredOtps);
                    await db.SaveChangesAsync();
                }

                await Task.Delay(TimeSpan.FromMinutes(30), stoppingToken); // هر نیم‌ساعت پاکسازی کن
            }
        }

        public async Task SendOtpAsync(string phoneNumber)
        {
            // بررسی اینکه آیا کد فعال قبلاً وجود داره
            var existingOtp = await _db.OtpCodes
                .Where(x => x.PhoneNumber == phoneNumber && !x.IsUsed && x.ExpirationTime > DateTime.UtcNow)
                .OrderByDescending(x => x.ExpirationTime)
                .FirstOrDefaultAsync();

            if (existingOtp != null)
            {
                // یا همین کد رو دوباره استفاده کن (و اگه خواستی تاریخش رو تمدید کن)
                existingOtp.ExpirationTime = DateTime.UtcNow.AddMinutes(2);
                await _db.SaveChangesAsync();

                Console.WriteLine($"OTP (reused) for {phoneNumber}: {existingOtp.Code}");
                return;
            }

            // ساخت کد جدید
            var code = _random.Next(100000, 999999).ToString();

            var otp = new OtpCode
            {
                PhoneNumber = phoneNumber,
                Code = code,
                ExpirationTime = DateTime.UtcNow.AddMinutes(2),
                IsUsed = false
            };

            _db.OtpCodes.Add(otp);
            await _db.SaveChangesAsync();

            Console.WriteLine($"OTP (new) for {phoneNumber}: {code}");


            _smsService.SendOtpAsync(phoneNumber, code);
            return;
        }


        public async Task<bool> VerifyOtpAsync(string phoneNumber, string code)
        {
            var otp = await _db.OtpCodes
                .Where(x => x.PhoneNumber == phoneNumber && x.Code == code && !x.IsUsed)
                .OrderByDescending(x => x.ExpirationTime)
                .FirstOrDefaultAsync();

            if (otp == null || otp.ExpirationTime < DateTime.UtcNow)
                return false;

            otp.IsUsed = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}