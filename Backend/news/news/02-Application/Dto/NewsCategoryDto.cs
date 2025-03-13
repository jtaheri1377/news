namespace news._02_Application.Dto
{
    public class NewsCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Icon { get; set; }
        public int? DisplayOrder { get; set; }
        public int? ParentId { get; set; }

    }

}
