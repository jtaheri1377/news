using lms_dashboard._01_Domain.Model;

namespace lms_dashboard._02_Application.Mapper
{
    public static class PermissionMapper
    {
        public static PermissionDto ToDto(this Permission model)
        {
            var dto = new PermissionDto
            {
                Id = model.Id,
                Name = model.Name,
            };
            return dto;
        }

        public static List<PermissionDto> ToListDto(this List<Permission> models)
        {
            return models.Select(x => ToDto(x)).ToList();
        }

        public static Permission ToModel(this PermissionDto dto)
        {
            var model = new Permission
            {
                Id = dto.Id,
                Name = dto.Name,
            };
            return model;
        }

    }
}
