namespace news._01_Domain.Models_Entities_.Media
{
    public class Media
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Alt { get; set; }
        public string Title { get; set; }

        public int? NewsModelId { get; set; } // می‌تواند null باشد چون برخی مدیاها برای استوری هستند
        public NewsModel? NewsModel { get; set; }

        public bool IsDeleted { get; set; } // حذف منطقی
    }

}
