namespace news._02_Application.Dto
{
    public class UserSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string? Username { get; set; }
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string? SocialMedia1 { get; set; }
        public string? SocialMedia2 { get; set; }
        public string Username { get; set; }
        public bool IsActive { get; set; } = true;  
        public string? Email { get; set; }
        public string? Address { get; set; }
        public List<Role>? Roles { get; set; } = new List<Role>();

    }

    public class UserSaveDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string? SocialMedia1 { get; set; }
        public string? SocialMedia2 { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; } = true;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public List<int>? RoleIds { get; set; } = new List<int>();
    }
}
