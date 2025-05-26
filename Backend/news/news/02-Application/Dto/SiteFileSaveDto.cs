using news._01_Domain.Enum;
using news._01_Domain.Models_Entities_.Media;
using news._01_Domain.Models_Entities_.NewsCategory;
using news._01_Domain.Models_Entities_.Province;
using news._01_Domain.Models_Entities_.Subject;
using news._01_Domain.Unit;

public class SiteFileSaveDto
{
    public int Id { get; set; }
    public string Link { get; set; }
    public SiteFileType SiteFileType { get; set; }
    public int UploadId { get; set; }
    public string FileUrl { get; set; } 
}

