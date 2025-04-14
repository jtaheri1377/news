using news._02_Application.Mapper.News;

public static class BannerMapper
{
    public static Banner ToModel(this BannerSaveDto dto, NewsModel news)
    {
        if (news == null) 
            return new Banner();

        return new Banner
        {
            Title = news.Title,
            Description = news.Description,
            StudyTime = news.StudyTime,
            img= news.img,
            NewsCategoryId = dto.NewsCategoryId,
            NewsModelId = dto.NewsModelId,
        };
    }

    public static BannerDto ToDto(this Banner dto)
    {
        return new BannerDto
        {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            StudyTime = dto.StudyTime,
            img = dto.img,
            PublishedDate = dto.PublishedDate,
        };
    }

    public static List<BannerDto> ToListDto(this List<Banner> models)
    {
        return models.Select(x => x.ToDto()).ToList();
    }




}

