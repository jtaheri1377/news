public class ProvinceDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<ProvinceDto> Children { get; set; }
}

public class ProvinceSummaryDto
{
    public int Id { get; set; }
    public string Name { get; set; }
}

//public class ProvinceSaveDto
//{
//    public int Id { get; set; }
//    public string Name { get; set; }
//    public string Title { get; set; }
//    public bool IsSelected { get; set; }
//    public int? ParentId { get; set; }
//}