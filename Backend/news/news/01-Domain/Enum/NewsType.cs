using System.ComponentModel.DataAnnotations;

namespace news._01_Domain.Enum
{
    public enum NewsType:byte
    {
        [Display(Name ="عمومی")] General=0,
        [Display(Name ="هیئت رئیسه")] DirectorsBoard = 1,
        [Display(Name ="جلسه")] Meeting =2,
        [Display(Name ="مصاحبه")] Interview=3,
        [Display(Name ="کمیسیون")] Unit=4,

    }
}
