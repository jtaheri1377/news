namespace news._02_Application.Dto.LoadMoreNewsResult
{
    public class LasyLoadResponse<T>
    {
        public List<T> List { get; set; } = new List<T>();
        public bool HasMore { get; set; }
    }
}
