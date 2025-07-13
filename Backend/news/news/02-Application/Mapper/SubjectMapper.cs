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

        public static SubjectDto ToDto(this Subject subject) { 
            return new SubjectDto
            {
                Id = subject.Id,
                name= subject.Name
            };
        }

        public static List<SubjectDto> ToListDto(this List<Subject> subjects)
        {
            return subjects.Select(x=>x.ToDto()).ToList();  
        }
    }
}
