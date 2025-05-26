using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Province;

namespace news._01_Domain.Models_Entities_.User
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public UserType UserType { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public bool IsActive { get; set; } = true; // فعال/غیرفعال
        public bool IsDeleted { get; set; } = false;

        public ICollection<Role> Roles { get; set; } = new List<Role>();
    }

}
