using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.NewsCategory;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.Subject;
using news._01_Domain.Unit;

public class BannerSaveDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string img { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string StudyTime { get; set; } = string.Empty;
    public int NewsModelId { get; set; }
    public int NewsCategoryId { get; set; }
}

