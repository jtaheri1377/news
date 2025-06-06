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
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var token = await _authService.RegisterAsync(dto);
            if (token == null)
                return BadRequest("کاربر مورد نظر، از قبل در سیستم وجود دارد!");

            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request.Username, request.Password);
            if (token == null)
                return Unauthorized();

            return Ok(new { token });
        }

    }

}
