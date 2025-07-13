using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using news._01_Domain.Models_Entities_.User;
using news._02_Application.Settings;
using news._03_Infrastructure.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace news._02_Application
{

    public class AuthService1
    {
        private readonly NewsDbContext _db;
        private readonly JwtSettings _jwtSettings;

        public AuthService1(NewsDbContext db, IOptions<JwtSettings> jwtOptions)
        {
            _db = db;
            _jwtSettings = jwtOptions.Value;
        }

        public async Task<string?> RegisterAsync(string username, string password)
        {
            var userExists = await _db.Users.AnyAsync(u => u.NationalCode == username);
            if (userExists) return null;

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            var user = new User
            {
                NationalCode = username,
                PasswordHash = passwordHash
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return GenerateJwtToken(user);
        }

        public async Task<string?> LoginAsync(string username, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.NationalCode == username);
            if (user == null) return null;

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isPasswordValid) return null;

            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim("NationalCode", user.NationalCode),
        new Claim("uid", user.Id.ToString()),
    };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }

}
