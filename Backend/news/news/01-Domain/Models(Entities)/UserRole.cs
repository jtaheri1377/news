namespace news._01_Domain.Models_Entities_.Province
{
    public class UserRole
    {
        public int? UserId { get; set; }
        public User.User? User { get; set; }

        public int? RoleId { get; set; }
        public Role? Role { get; set; }
    }


}
