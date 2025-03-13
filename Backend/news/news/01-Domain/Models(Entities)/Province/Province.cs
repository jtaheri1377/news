 
namespace news._01_Domain.Models_Entities_.Province
{ 
    public class Province
    {
        public int Id { get; set; }
        public string Name { get; set; } // نام استان یا شهرستان

        public int? ParentId { get; set; } // اگر مقدار داشته باشد، یعنی این یک شهرستان است
        public Province? Parent { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<Province>? Children { get; set; } // زیرمجموعه‌ها (شهرستان‌ها)

        public ICollection<NewsModel>? News { get; set; } // ارتباط با اخبار
    }

}
