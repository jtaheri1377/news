using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.User;
using news._02_Application.Interfaces;

public class AuthService : IAuthService
{
    private readonly byte[] _key;

    public AuthService(IConfiguration configuration)
    {
        var jwtSettings = configuration.GetSection("JwtSettings");
        _key = Encoding.UTF8.GetBytes(jwtSettings["Secret"]);
    }

    public string GenerateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.UserType.ToString())
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(60),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = "newsapi",
            Audience = "newsclients"
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public User Authenticate(string username, string password)
    {
        // در محیط واقعی باید کاربر را از دیتابیس بگیریم، اینجا تستی مقداردهی می‌کنیم
        if (username == "admin" && password == "1234")
        {
            return new User { Id = 1, UserName = "admin", UserType = UserType.Admin };
        }
        return null;
    }
}
