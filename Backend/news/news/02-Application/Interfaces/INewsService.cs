namespace news._02_Application.Interfaces
{
    public interface INewsService
    {
        Task<List<NewsModel>> GetAll();
        Task<NewsModel?> GetById(int id);
        Task<NewsModel> Update(NewsModel news);
        Task<bool> Delete(int id);
    }
}
