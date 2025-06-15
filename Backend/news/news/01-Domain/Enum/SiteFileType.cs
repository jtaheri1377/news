using System.ComponentModel.DataAnnotations;

namespace news._01_Domain.Enum
{
    public enum SiteFileType:byte
    {
        [Display(Name ="قوانین و مقررات")] Rules=0,
        [Display(Name ="عکس بنر بالای صفحه اصلی")] HomeTopImage = 1,
        [Display(Name ="عکس بنر بالای صفحه اصلی (موبایل) ")] HomeTopImageMobile=2,
        [Display(Name ="عکس تبلیغات 1")] FirstAdImage=3,
        [Display(Name ="عکس تبلیغات 2")] SecondAdImage = 4,
        [Display(Name ="عکس لینک 1")] FirstLinkImage = 5,
        [Display(Name ="عکس لینک 2")] SecondLinkImage = 6,
        [Display(Name ="عکس لینک 3")] ThirdLinkImage = 7,
        [Display(Name ="عکس لینک 4")] ForthLinkImage = 8,
        [Display(Name = "عکس لینک فضای مجازی 1")] FirstSocialLinkImage = 9,
        [Display(Name = "عکس لینک فضای مجازی 2")] SecondSocialLinkImage = 10,
        [Display(Name = "عکس لینک فضای مجازی 3")] ThirdSocialLinkImage = 11,
        [Display(Name = "عکس لینک فضای مجازی 4")] ForthSocialLinkImage = 12,
    }
}
