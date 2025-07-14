namespace lms_dashboard._01_Domain.Model
{

    public class RoleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<int>? PermissionIds { get; set; }
    }

    public class RoleSaveDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<int>? PermissionIds { get; set; }
    }
}
