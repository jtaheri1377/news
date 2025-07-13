using news._01_Domain.Models_Entities_.Story;

namespace news._01_Domain.Models_Entities_.Media
{
    public class Media
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileUrl { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string Extension { get; set; }
        public string FileType { get; set; }
        public long FileSize { get; set; }
        public string? Duration { get; set; }
        public string? Alt { get; set; }
        public DateTime UploadDate { get; set; }

        public int? NewsModelId { get; set; }  
        public NewsModel? NewsModel { get; set; }
        public int? StoryId { get; set; }  
        public Story.Story? Story { get; set; }
        public int? SiteFileId { get; set; }
        public SiteFile? SiteFile { get; set; }

        public bool IsDeleted { get; set; }  
    }


}
