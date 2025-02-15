using news._01_Domain.Enum;

namespace news._01_Domain.Models_Entities_.User
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public bool IsDeleted { get; set; } // فیلد حذف منطقی
        public UserType UserType { get; set; }

    }
}
