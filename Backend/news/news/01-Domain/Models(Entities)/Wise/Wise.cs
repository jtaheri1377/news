namespace news._01_Domain.Wise
{
    /// <summary>
    /// فرزانگان
    /// </summary>
    public class Wise
    {

        public Wise() { }
        public Wise(int Id, string Name, string Description, string Author, string Subject, string Language,
            int VolumeCount, string Translator, string Img)
        {
           this.Id = Id;
            this.Name = Name;
            this.Description = Description;
            this.Author = Author;
            this.Subject = Subject;
            this.Img = Img;
            this.Language= Language;
            this.Translator = Translator;
            this.VolumeCount = VolumeCount;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string Subject { get; set; }
        public string Language { get; set; }
        public int VolumeCount { get; set; }
        public string Translator { get; set; }
        public string Img { get; set; }

        public bool IsDeleted { get; set; } 

        internal void Delete()
        {
            IsDeleted = true;
        }
    }

}
