using System.ComponentModel.DataAnnotations;

namespace news._01_Domain.Enum
{
    public enum GalleryType:byte
    {
        [Display(Name ="استوری")] Story=0,
        [Display(Name ="خبر")] News = 1,
        [Display(Name ="غیره")] Other = 2,
    }
}
