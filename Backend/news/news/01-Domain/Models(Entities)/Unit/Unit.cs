namespace news._01_Domain.Unit
{
    public class Unit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Goal { get; set; }

        public bool IsDeleted { get; set; } // حذف منطقی
    }

}
