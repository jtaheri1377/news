
namespace news._01_Domain.Models_Entities_.Story
{
    public class Story
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
         public string Description { get; set; } = string.Empty;
        public decimal Reviews { get; set; } = 0;
        public decimal Likes { get; set; } = 0;
        public decimal Dislikes { get; set; } = 0;
        public decimal Hearts { get; set; } = 0;
         public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
        public int? ProvinceId { get; set; }
        public Province.Province? Province { get; set; }
        public List<Media.Media>? Medias { get; set; }
        public bool IsDeleted { get; set; } 

        internal void Delete()
        {
            IsDeleted = true;
        }
    }
}
