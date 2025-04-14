namespace news._02_Application.Mapper.News
{
    public static class NewsMapper
    {
        public static NewsSummaryDto ToSummaryDto(this NewsModel model)
        {
            return new NewsSummaryDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                PublishedDate = model.PublishedDate,
                img = model.img,
                Reviews = model.Reviews,
                StudyTime = model.StudyTime,
                Province = model.Province != null ? model.Province.Name : null,
                Subject = model.Subject != null ? model.Subject.Name : null
            };
        }

        public static NewsDetailDto ToDetailDto(this NewsModel model)
        {
            return new NewsDetailDto
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                PublishedDate = model.PublishedDate,
                img = model.img,
                Reviews = model.Reviews,
                StudyTime = model.StudyTime,
                Province = model.Province != null ? model.Province.Name : null,
                Subject = model.Subject != null ? model.Subject.Name : null,
                Content= model.NewsContent!=null ? model.NewsContent.Content:null
            };
        }

        public static List<NewsSummaryDto> ToListDto(this List<NewsModel> models)
        {
            return models.Select(x=>x.ToSummaryDto()).ToList();
        }


        public static NewsModel ToModel(NewsSaveDto dto, NewsModel? model = null)
        {
            if (model == null)
                model = new NewsModel();

            model.Title = dto.Title;
            model.img = dto.img;
            model.Description = dto.Description;
            model.StudyTime = dto.StudyTime;
            model.ProvinceId = dto.ProvinceId;
            model.SubjectId = dto.SubjectId;
            return model;
        }


        
    }
}
