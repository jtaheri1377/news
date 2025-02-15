using System.ComponentModel.DataAnnotations;

namespace news._01_Domain.Enum
{
    public enum UserType:byte
    {
        [Display(Name ="برنامه نویس")] Developer=0,
        [Display(Name ="مدیر سامانه")] Admin=1,
        [Display(Name ="ویراستار")] Editor =2,
        [Display(Name ="کاربر عادی")] User=3,

    }
}
