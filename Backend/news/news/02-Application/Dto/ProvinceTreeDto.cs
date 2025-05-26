namespace news._01_Domain.Models_Entities_.Province
{
    public class ProvinceTreeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } // نام استان یا شهرستان
        public int? ParentId { get; set; }
        public List<ProvinceTreeDto>? Children { get; set; } // زیرمجموعه‌ها (شهرستان‌ها)
    }

}
