
using news._02_Application.Dto;
using news._01_Domain.Wise;

namespace news._02_Application.Mapper.WiseMapper
{
    public static class WiseMapper
    {
        /// <summary>
        /// برای دریافت dto از کاربر و تبدیل به مدل عادی در فرم
        /// </summary>
        public static Wise ToModel(this WiseDto dto)
        {
            return new Wise
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                Author = dto.Author,
                Subject = dto.Subject,
                Language = dto.Language,
                VolumeCount = dto.VolumeCount,
                Translator = dto.Translator,
                Img = dto.Img
            };
        }

        public static WiseDto ToDto(this Wise model)
        {
            return new WiseDto
            {
                Id = model.Id,
                Author = model.Author,
                Subject = model.Subject,
                Language = model.Language,
                Name = model.Name,
                Description = model.Description,
                Img = model.Img,
                Translator = model.Translator,
                VolumeCount = model.VolumeCount
            };

        }

        public static List<WiseDto> ToListDto(this List<Wise> models)
        {
            return models.Select(x=>x.ToDto()).ToList();
        }
    }
}
