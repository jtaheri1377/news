namespace lms_dashboard._01_Domain.Model
{
    public class ResetPasswordByEmailDto
    {
        public string Username { get; set; }
    }

    public class ResetPasswordDto
    {
        public string Username { get; set; }
        public string Phone { get; set; }
    }

    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }


    public class ChangePasswordDto
    {
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }


    public class RegisterDto
    {
        public string Name { get; set; }
        public string Family { get; set; }
        public string NationalCode { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; } = true;
        public string Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string? SocialMedia1 { get; set; }
        public string? SocialMedia2 { get; set; }
    }




}
