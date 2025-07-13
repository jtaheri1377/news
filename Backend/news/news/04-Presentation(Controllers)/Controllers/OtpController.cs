using lms_dashboard._01_Domain.Model;
using lms_dashboard._02_Application.Interfaces;
using lms_dashboard._04_Presentation.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace lms_dashboard._04_Presentation
{
    [ApiController]
    [Route("api/[controller]")]
    public class OtpController : ControllerBase
    {
        private readonly IOtpService _service;

        public OtpController(IOtpService otpService)
        {
            _service = otpService;
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] string phoneNumber)
        {
            await _service.SendOtpAsync(phoneNumber);
            return Ok("کد ارسال شد.");
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerifyDto dto)
        {
            var isValid = await _service.VerifyOtpAsync(dto.PhoneNumber, dto.Code);
            if (!isValid)
                return BadRequest("کد نامعتبر یا منقضی شده است.");

            // در اینجا می‌تونی JWT بدهی یا کاربر رو لاگین کنی
            return Ok("تأیید شد.");
        }
    }

    public class OtpVerifyDto
    {
        public string PhoneNumber { get; set; }
        public string Code { get; set; }
    }

}
