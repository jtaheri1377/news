using news._01_Domain.Models_Entities_.Subject;
using news._02_Application.Dto;

namespace news._02_Application.Mapper.SubjectMapper
{
    public static class SubjectMapper
    {
        public static Subject ToModel(this SubjectDto dto)
        {
            return new Subject
            {
                Id = dto.Id,
                Name = dto.name,
                IsDeleted = false
            };
        }
    }
}
