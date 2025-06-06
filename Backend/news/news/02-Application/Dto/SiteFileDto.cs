using news._01_Domain.Enum;

public class SiteFileDto
{
    public int Id { get; set; }
    public string Link { get; set; }
    public SiteFileType? SiteFileType { get; set; }
    public string FileUrl { get; set; }
    public string Extension { get; set; }
    public string FileType { get; set; }
    public long FileSize { get; set; }
    public string? Alt { get; set; }
    public DateTime UploadDate { get; set; }
}
