using news._02_Application.Mapper.News;

public static class BannerMapper
{
    public static Banner ToModel(this BannerSaveDto dto, NewsModel news)
    {
        if (news == null) 
            return new Banner();

        return new Banner
        {

            Title = dto.Title.Length!=0? dto.Title:news.Title,
            Description = dto.Description.Length != 0 ? dto.Description: news.Description,
            StudyTime = news.StudyTime,
            img= dto.img.Length != 0 ? dto.img: news.img,
            NewsCategoryCode = dto.CategoryCode,
            NewsModelId = dto.NewsId,
        };
    }

    public static BannerDto ToDto(this Banner model)
    {
        return new BannerDto
        {
            NewsId= model.NewsModelId,
            CategoryId = model.NewsModel != null && model.NewsModel.Categories.Any()
                     ? model.NewsModel.Categories.First().Id
                     : 0,
            Id = model.Id,
            Title = model.Title,
            Description = model.Description,
            StudyTime = model.StudyTime,
            img = model.img,
            PublishedDate = model.PublishedDate,
        };
    }

    public static List<BannerDto> ToListDto(this List<Banner> models)
    {
        return models.Select(x => x.ToDto()).ToList();
    }




}

