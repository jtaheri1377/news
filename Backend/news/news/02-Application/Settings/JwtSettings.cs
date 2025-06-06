namespace news._02_Application.Settings
{
    public class JwtSettings
    {
        public string SecretKey { get; set; } = string.Empty;
        public string Issuer { get; set; } = "AuthSystem";
        public string Audience { get; set; } = "AuthSystemUser";
        public int ExpirationMinutes { get; set; } = 120;
    }
}
