using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.NewsCategory;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.Subject;
using news._01_Domain.Unit;

public class NewsModel
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string img { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Reviews { get; set; } = 0;
    public string StudyTime { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
    public int? ProvinceId { get; set; }
    public Province? Province { get; set; }
    public int? UnitId { get; set; }
    public Unit? Unit { get; set; }
    public ICollection<Media> Media { get; set; }
    public int MediaId { get; set; }
    public Subject? Subject { get; set; }
    public int? SubjectId { get; set; }

    // مجموعه دسته‌بندی‌های موضوعی
    public ICollection<NewsCategory> Categories { get; set; } = new List<NewsCategory>();

    public bool IsDeleted { get; set; } // حذف منطقی

}

