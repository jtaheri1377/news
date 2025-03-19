using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.NewsCategory;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.Subject;
using news._01_Domain.Unit;
using news._02_Application.Dto;

public class GalleryDto
{

    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Reviews { get; set; } = 0;
    public string StudyTime { get; set; } = string.Empty;
    public string Province { get; set; } = string.Empty;
    public GalleryType Type { get; set; }
    public string img { get; set; } = string.Empty;
    public int? NewsModelId { get; set; }  
    public int? StoryId { get; set; }
    public List<MediaGalleryDto> Medias { get; set; }


    //public string FileName { get; set; }
    //public string FileUrl { get; set; }
    //public string? ThumbnailUrl { get; set; }
    //public string Extension { get; set; }
    //public string FileType { get; set; }
    //public long FileSize { get; set; }
    //public string? Duration { get; set; }
    //public string? Alt { get; set; }
    //public DateTime UploadDate { get; set; }

    //public NewsModel? NewsModel { get; set; }


    //public bool IsDeleted { get; set; } // حذف منطقی

    //public int Id { get; set; }

    //public string Content { get; set; } = string.Empty;
    //public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
    //public int? ProvinceId { get; set; }
    //public int UnitId { get; set; }
    //public int? SubjectId { get; set; }
    //public ICollection<int> MediaIds { get; set; }
    //public ICollection<int> CategoryIds { get; set; }
    // public int MediaId { get; set; }

    // مجموعه دسته‌بندی‌های موضوعی
    //public ICollection<NewsCategory> Categories { get; set; } = new List<NewsCategory>();

    //public bool IsDeleted { get; set; } // حذف منطقی

}

