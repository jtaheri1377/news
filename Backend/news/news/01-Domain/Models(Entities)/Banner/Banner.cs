using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.NewsCategory;
public class Banner
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string img { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string StudyTime { get; set; } = string.Empty;
    public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
    public int NewsModelId { get; set; }
    public NewsModel NewsModel{ get; set; }
    public int NewsCategoryId { get; set; }
    public NewsCategory NewsCategory{ get; set; }
}

