using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.Province;

namespace news._02_Application.Dto
{
    public class StoryDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public List<MediaGalleryDto> Medias { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Reviews { get; set; } = 0;
        public decimal Likes { get; set; } = 0;
        public decimal Dislikes { get; set; } = 0;
        public decimal Hearts { get; set; } = 0;
        public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
        public string Province { get; set; } = string.Empty;
      
    }
}
