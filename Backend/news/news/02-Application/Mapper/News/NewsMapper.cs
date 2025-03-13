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
                Unit = model.Unit != null ? model.Unit.Name : null,
                Subject = model.Subject != null ? model.Subject.Name : null
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
            model.Reviews = dto.Reviews;
            model.StudyTime = dto.StudyTime;
            model.Content = dto.Content;
            model.PublishedDate = dto.PublishedDate;
            model.ProvinceId = dto.ProvinceId;
            model.UnitId = dto.UnitId;
            model.SubjectId = dto.SubjectId;
            return model;
        }
    }
}
