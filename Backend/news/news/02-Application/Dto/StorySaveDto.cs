using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.Province;

namespace news._02_Application.Dto
{
    public class StorySaveDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        //public decimal Reviews { get; set; } = 0;
        //public decimal Likes { get; set; } = 0;
        //public decimal Dislikes { get; set; } = 0;
        //public decimal Hearts { get; set; } = 0;
        //public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
        public int? ProvinceId { get; set; }
        public List<int> MediaIds { get; set; }
    }
}
