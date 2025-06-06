using System.Text.Json.Serialization;

namespace news._01_Domain.Models_Entities_.NewsCategory
{
    public class NewsCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;    // نام دسته‌بندی
        public string? Description { get; set; }              // توضیح دسته‌بندی (اختیاری)
        public string? Icon { get; set; }                     // آیکون (مثلاً URL یا کلاس CSS)
        public int? DisplayOrder { get; set; }                // ترتیب نمایش دسته‌بندی در UI

        // ساختار سلسله‌مراتبی
        public int? ParentId { get; set; }
        public NewsCategory? Parent { get; set; }
        public ICollection<NewsCategory>? Children { get; set; } = new List<NewsCategory>();
        public List<Banner>? Banners { get; set; }
        [JsonIgnore]
        // ارتباط Many-to-Many با اخبار
        public ICollection<NewsModel>? News { get; set; } = new List<NewsModel>();

        public bool IsDeleted { get; set; } // حذف منطقی
    }


}
