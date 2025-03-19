using news._01_Domain.Models_Entities_.Story;

namespace news._02_Application.Dto
{
    public class MediaGalleryDto
    {
        public int Id { get; set; }
         public string FileUrl { get; set; }
        public string? ThumbnailUrl { get; set; }
         public string FileType { get; set; }
        public string? Duration { get; set; }
        public string? Alt { get; set; }
        public DateTime UploadDate { get; set; }

       }
}
