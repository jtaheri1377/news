using news._01_Domain.Models_Entities_.Province;

namespace news._02_Application.Mapper.ProvinceMapper
{
    public static class ProvinceMapper
    {
        public static ProvinceDto ToDto(this Province province)
        {
            return new ProvinceDto
            {
                Id = province.Id,
                Name = province.Name,   
            };
        }

        public static ProvinceTreeDto ToTreeDto(this Province province)
        {
            return new ProvinceTreeDto
            {
                Id = province.Id,
                Name = province.Name,
                ParentId=province.ParentId,
                Children=province.Children?.ToTreeListDto()
            };
        }

        public static Province ToModel(this ProvinceSaveDto dto)
        {
            return new Province
            {
                Id = dto.Id,
                Name = dto.Name,
                ParentId = dto.ParentId,
                IsDeleted=false,
            };
        }



        public static List<ProvinceDto> ToListDto(this List<Province> provinces)
        {
            return provinces.Select(x=>x.ToDto()).ToList();
        }

        public static List<ProvinceTreeDto> ToTreeListDto(this List<Province> provinces)
        {
            return provinces.Select(x => x.ToTreeDto()).ToList();
        }
    }
}
