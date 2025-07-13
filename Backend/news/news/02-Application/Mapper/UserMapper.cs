using news._01_Domain.Models_Entities_.User;
using news._02_Application.Dto;

namespace lms_dashboard._02_Application.Mapper
{
    public static class UserMapper
    {
        public static UserSummaryDto ToSummaryDto(this User model)
        {
            var dto = new UserSummaryDto
            {
                Id = model.Id,
                Name = model.Name,
                Family = model.Family,
                Username = model.NationalCode,
            };
            return dto;
        }

        public static UserDto ToDto(this User model)
        {
            var dto = new UserDto
            {
                Id = model.Id,
                Name = model.Name,
                Family = model.Family,
                NationalCode = model.NationalCode,
                Address = model.Address,
                Email = model.Email,
                Phone1 = model.Phone1,
                Phone2 = model.Phone2,
                SocialMedia1 = model.SocialMedia1,
                SocialMedia2 = model.SocialMedia2,
                RoleIds = model.Roles.Select(x => x.Id).ToList(),
                Roles = model.Roles.ToListDto(),
            };
            return dto;
        }

        public static List<UserSummaryDto> ToSummaryListDto(this List<User> models)
        {
            return models.Select(x => ToSummaryDto(x)).ToList();
        }

        public static List<UserDto> ToListDto(this List<User> models)
        {
            return models.Select(x => ToDto(x)).ToList();
        }



        public static User ToModel(this UserSaveDto dto)
        {
            var model = new User
            {
                Name = dto.Name,
                Family = dto.Family,
                NationalCode = dto.NationalCode,
                IsActive = dto.IsActive,
                Email = dto.Email,
                Address = dto.Address,
                SocialMedia1 = dto.SocialMedia1,
                SocialMedia2 = dto.SocialMedia2,
                Phone1 = dto.Phone1,
                Phone2 = dto.Phone2,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                IsDeleted = false,
            };
            return model;
        }

    }
}
