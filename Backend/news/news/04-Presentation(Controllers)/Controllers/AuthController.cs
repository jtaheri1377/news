using lms_dashboard._01_Domain.Model;
using Microsoft.AspNetCore.Mvc;
using news._01_Domain.LoginRequest;
using news._01_Domain.Models_Entities_.User;
using news._02_Application;



namespace news._04_Presentation_Controllers_.Controllers
{


    [ApiController]
    [Route("/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService authService)
        {
            _service = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var token = await _service.RegisterAsync(dto);
            if (token == null)
                return BadRequest("کاربر مورد نظر، از قبل در سیستم وجود دارد!");

            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _service.LoginAsync(request.Username, request.Password);
            if (token == null)
                return Unauthorized();

            return Ok(new { token });
        }


        [HttpPost("ResetPasswordBySms")]
        public async Task ResetPasswordBySms([FromBody] ResetPasswordDto dto)
        {
            await _service.ResetPasswordBySms(dto);
        }

        [HttpPost("ResetPasswordByEmail")]
        public async Task ResetPasswordByEmail([FromBody] ResetPasswordByEmailDto dto)
        {
            await _service.ResetPasswordByEmail(dto);
        }

        [HttpPost("ChangePassword")]
        //[Authorize]
        public async Task ChangePassword([FromBody] ChangePasswordDto dto)
        {
            await _service.ChangePassword(dto);
        }

    }

}
