using lms_dashboard._01_Domain.Model;

namespace lms_dashboard._02_Application.Mapper
{
    public static class RoleMapper
    {
        public static RoleDto ToDto(this Role model)
        {
            var dto = new RoleDto
            {
                Id = model.Id,
                Name = model.Name,
                PermissionIds= model.Permissions.Select(x=>x.Id).ToList(),
            };
            return dto;
        }

        public static List<RoleDto> ToListDto(this List<Role> models)
        {
            return models.Select(x => ToDto(x)).ToList();
        }

        public static Role ToModel(this RoleSaveDto dto)
        {
            var model = new Role
            {
                Id = dto.Id,
                Name = dto.Name,
            };
            return model;
        }

    }
}
