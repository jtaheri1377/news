using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Province;

namespace news._01_Domain.Models_Entities_.User
{
    public class RegisterDto
    {
        public string Name { get; set; }
        public string Family { get; set; }
        public string NationalCode { get; set; }
        public string Password{ get; set; }
        public bool IsActive { get; set; } = true;
        public string Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string? SocialMedia1 { get; set; }
        public string? SocialMedia2 { get; set; }
    }

}
