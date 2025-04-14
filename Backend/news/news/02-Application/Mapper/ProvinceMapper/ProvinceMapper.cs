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

        public static List<ProvinceDto> ToListDto(this List<Province> provinces)
        {
            return provinces.Select(x=>x.ToDto()).ToList();
        }
    }
}
