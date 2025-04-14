using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.NewsCategory;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.Subject;
using news._01_Domain.Unit;

public class NewsSaveDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string img { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string StudyTime { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int? ProvinceId { get; set; }
    public int? SubjectId { get; set; }
    public ICollection<int> MediaIds { get; set; }
    public ICollection<int> CategoryIds { get; set; }
    // public int MediaId { get; set; }

    // مجموعه دسته‌بندی‌های موضوعی
    //public ICollection<NewsCategory> Categories { get; set; } = new List<NewsCategory>();

    //public bool IsDeleted { get; set; } // حذف منطقی

}