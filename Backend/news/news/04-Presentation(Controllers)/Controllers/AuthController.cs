using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using news._01_Domain.LoginRequest;
using news._02_Application.Interfaces; 

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("Login")]
    public IActionResult Login([FromBody] news._01_Domain.LoginRequest.LoginRequest request)
    {
        var user = _authService.Authenticate(request.UserName, request.Password);
        if (user == null)
            return Unauthorized("نام کاربری یا رمز عبور اشتباه است");

        var token = _authService.GenerateToken(user);
        return Ok(new { Token = token });
    }
}
