namespace news._01_Domain.Models_Entities_.Subject
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Boolean IsDeleted { get; set; }
        public List<NewsModel> newsModels { get; set; }
    }
}
