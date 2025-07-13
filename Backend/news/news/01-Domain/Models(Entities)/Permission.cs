
public class Permission
{
    public int Id { get; set; }
    public string Name { get; set; } // مثلا: "News.GetAll"
    public string Title { get; set; } 
    public bool IsSelected { get; set; }
    public int? ParentId { get; set; }
    public Permission? Parent{ get; set; }
    public List<Permission>? Children{ get; set; } = new List<Permission>();
    public List<Role>? Roles { get; set; } = new List<Role>();
}
