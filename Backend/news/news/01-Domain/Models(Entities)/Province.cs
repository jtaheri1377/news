
using news._01_Domain.Models_Entities_.Story;
using news._01_Domain.Models_Entities_.User;
namespace news._01_Domain.Models_Entities_.Province
{
    public class Province
    {
        public int Id { get; set; }
        public string Name { get; set; } // نام استان یا شهرستان
        public int? ParentId { get; set; } // اگر مقدار داشته باشد، یعنی این یک شهرستان است
        public Province? Parent { get; set; }
        public bool IsDeleted { get; set; }
        public List<Province>? Children { get; set; } // زیرمجموعه‌ها (شهرستان‌ها)
        public List<Story.Story>? Stories { get; set; } // ارتباط با اخبار
        public List<NewsModel>? News { get; set; } // ارتباط با اخبار
        public List<User.User>? Users { get; set; } // ارتباط با اخبار
    }
}