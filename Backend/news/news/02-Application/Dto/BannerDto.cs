public class BannerDto
{
    public int Id { get; set; }
    public int? NewsId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string img { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string StudyTime { get; set; } = string.Empty;
    public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
}

