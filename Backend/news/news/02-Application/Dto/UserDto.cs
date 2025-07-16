using lms_dashboard._01_Domain.Model;

namespace news._02_Application.Dto
{
    public class UserSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string? Username { get; set; }
        public List<string> Roles { get; set; }
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string SocialMedia1 { get; set; }
        public string? SocialMedia2 { get; set; }
        public string NationalCode { get; set; }
        public bool IsActive { get; set; } = true;  
        public string Email { get; set; }
        public string? Address { get; set; }
        public List<int>? RoleIds { get; set; } = new List<int>();
        public List<RoleDto>? Roles { get; set; } = new List<RoleDto>();
    }

    public class UserSaveDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string SocialMedia1 { get; set; }
        public string? SocialMedia2 { get; set; }
        public string NationalCode { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; } = true;
        public string Email { get; set; }
        public string? Address { get; set; }
        public List<int>? RoleIds { get; set; } = new List<int>();
    }
}
