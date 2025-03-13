namespace news._02_Application.Dto.LoadMoreNewsResult
{
    public class LoadMoreNewsResult
    {
        public List<NewsSummaryDto> News { get; set; } = new List<NewsSummaryDto>();
        public bool HasMore { get; set; }
    }

}
