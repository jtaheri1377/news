
public class Permission
{
    public int Id { get; set; }
    public string Name { get; set; } // مثلا: "News.GetAll"

    public IList<Role>? Roles { get; set; } = new List<Role>();
}
