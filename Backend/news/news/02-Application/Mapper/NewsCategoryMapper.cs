using news._01_Domain.Models_Entities_.NewsCategory;
using news._02_Application.Dto;
using news._02_Application.Mapper.News;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace news._02_Application.Mapper.NewsCategoryMapper
{
    public static class NewsCategoryMapper
    {
        public static NewsCategoryDto ToDto(this NewsCategory entity)
        {
            if (entity == null)
                return null;
            return new NewsCategoryDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Icon = entity.Icon,
                DisplayOrder = entity.DisplayOrder,
                ParentId = entity.ParentId,
                ParentCode = entity.ParentCode,
                Code = entity.Code
            };
        }
 

        public static List<NewsCategoryDto> ToListDto(this List<NewsCategory> models)
        {
            return models.Select(x => x.ToDto()).ToList();
        }


        public static NewsCategory ToEntity(NewsCategoryDto dto)
        {
            if (dto == null)
                return null;
            return new NewsCategory

            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                Icon = dto.Icon,
                DisplayOrder = dto.DisplayOrder,
                ParentId = dto.ParentId,
                ParentCode = dto.ParentCode,
                Code = dto.Code

            };
        }

        public static void MapToExistingEntity(NewsCategoryDto dto, NewsCategory entity)
        {
            if (dto == null || entity == null)
                return;
            entity.Name = dto.Name;
            entity.Description = dto.Description;
            entity.Icon = dto.Icon;
            entity.DisplayOrder = dto.DisplayOrder;
            entity.ParentId = dto.ParentId;
            entity.ParentCode = dto.ParentCode;
            entity.Code = dto.Code;
            

        }
    }


}
