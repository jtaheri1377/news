
public class PermissionDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }
    public bool IsSelected { get; set; }
    public int? ParentId { get; set; }
    public List<PermissionDto> Children { get; set; }
}

public class PermissionSaveDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }
    public bool IsSelected { get; set; }
    public int? ParentId { get; set; }
}