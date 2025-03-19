namespace news._02_Application.Dto.LoadMoreNewsResult
{
    public class LazyLoadResponse<T>
    {
        public List<T> List { get; set; } = new List<T>();
        public bool HasMore { get; set; }
    }
}
