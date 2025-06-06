using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Province;

namespace news._01_Domain.Models_Entities_.User
{
    public class RegisterDto
    {
        public string Name { get; set; }
        public string Family { get; set; }
        public string Username { get; set; }
        public string Password{ get; set; }
        public bool IsActive { get; set; } = true;
        public string Phone { get; set; }
        public string? SocialMediaId1 { get; set; }
        public string? SocialMediaId2 { get; set; }
    }

}
