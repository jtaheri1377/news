using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Unit;

public class NewsSummaryDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string StudyTime { get; set; } = string.Empty;
    public decimal Reviews { get; set; } 
    public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
    public string Province { get; set; }
    public string Subject { get; set; }
    public string img { get; set; } 
}

