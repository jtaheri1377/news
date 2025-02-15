 
namespace news._01_Domain.Models_Entities_.Province
{
    public class Province
    {
        public int Id { get; set; }
        //استان
        public string Name { get; set; }
        //شهر
        public string City { get; set; }
        //بخش
        public string Region { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<NewsModel> News { get; set; }
    }
}
