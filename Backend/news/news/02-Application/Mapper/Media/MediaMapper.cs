using news._01_Domain.Models_Entities_.Media;
using news._02_Application.Dto;
using news._02_Application.Mapper.News;

public static class MediaMapper
{
    public static MediaGalleryDto ToMediaGalleryDTo(this Media media)
    {
        return new MediaGalleryDto
        {
            Id = media.Id,
            FileType = media.FileType,
            FileUrl = media.FileUrl,
            Alt = media.Alt,
            Duration = media.Duration,
            ThumbnailUrl = media.ThumbnailUrl,
            UploadDate = media.UploadDate,
        };
    }

    public static List<MediaGalleryDto> ToMediaGalleryListDto(this List<Media> models)
    {
        return models.Select(x => x.ToMediaGalleryDTo()).ToList();
    }




}
