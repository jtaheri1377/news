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
                Title = model.Title,
                ParentId=model.ParentId,
                IsSelected=model.IsSelected,
                Children =model.Children.ToListDto()
                
            };
            return dto;
        }
        
        public static PermissionSummaryDto ToSummaryDto(this Permission model)
        {
            var dto = new PermissionSummaryDto
            {
                Id = model.Id,
                Name = model.Name,
                Title = model.Title,
            };
            return dto;
        }

        public static List<PermissionDto> ToListDto(this List<Permission> models)
        {
            return models.Select(x => ToDto(x)).ToList();
        }

        public static List<PermissionSummaryDto> ToSummartListDto(this List<Permission> models)
        {
            return models.Select(x => ToSummaryDto(x)).ToList();
        }


        public static Permission ToModel(this PermissionSaveDto dto)
        {
            var model = new Permission
            {
                Id = dto.Id,
                Name = dto.Name,
                Title = dto.Title,
                ParentId = dto.ParentId,
                IsSelected= dto.IsSelected,
            };
            return model;
        }

    }
}
