
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.User;

public class Role
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<User> Users { get; set; } = new List<User>();
    public ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}


