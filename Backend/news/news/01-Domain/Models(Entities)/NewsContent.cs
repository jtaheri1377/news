
public class NewsContent
{
    public int Id { get; set; }
    public string Content { get; set; }
    public int? NewsModelId { get; set; }
    public NewsModel? NewsModel { get; set; }
}