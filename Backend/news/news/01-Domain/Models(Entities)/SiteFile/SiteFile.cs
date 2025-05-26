using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Media;

public class SiteFile
{
    public int Id { get; set; }
    public int UploadId { get; set; }
    public string Link { get; set; }
    public SiteFileType SiteFileType { get; set; }
    public Media Media { get; set; }
    public string FileUrl { get; set; }
    public string Extension { get; set; }
    public string FileType { get; set; }
    public long FileSize { get; set; }
    public string? Alt { get; set; }
    public DateTime UploadDate { get; set; }

}
