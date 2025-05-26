
public class Permission
{
    public int Id { get; set; }
    public string Name { get; set; } // مثلا: "News.GetAll"
    public string Description { get; set; }

    public ICollection<Role> Roles { get; set; } = new List<Role>();
}
