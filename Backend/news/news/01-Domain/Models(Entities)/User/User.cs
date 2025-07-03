using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Province;

namespace news._01_Domain.Models_Entities_.User
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string? SocialMedia1 { get; set; }
        public string? SocialMedia2 { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public bool IsActive { get; set; } = true; // فعال/غیرفعال
        public bool IsDeleted { get; set; } = false;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public List<Role>? Roles { get; set; } = new List<Role>();
    }

}
