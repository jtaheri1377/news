using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.NewsCategory;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.Subject;
using news._01_Domain.Unit;
using news._02_Application.Dto;

public class NewsDetailDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string img { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Reviews { get; set; } = 0;
    public string StudyTime { get; set; } = string.Empty;
    public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
    public string Province { get; set; }
    public List<MediaGalleryDto> Medias { get; set; }
    public List<MediaGalleryDto> ImgCover { get; set; }
    public int SubjectId { get; set; }

    public string Subject { get; set; }
    public string Content { get; set; }

}

