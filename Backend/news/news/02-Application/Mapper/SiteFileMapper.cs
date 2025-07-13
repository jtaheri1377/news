using news._01_Domain.Models_Entities_.Media;
using news._02_Application.Mapper.News;

public static class SiteFileMapper
{
    public static SiteFile ToModel(this SiteFileSaveDto dto, Media media)
    {
        if (media == null) 
            return new SiteFile();

        return new SiteFile
        {
            Id = dto.Id,
            SiteFileType = dto.SiteFileType,
            Link = dto.Link,
            FileSize=media.FileSize,
            FileType=media.FileType,
            FileUrl=media.FileUrl,
            Alt=media.Alt,
            UploadDate=media.UploadDate,
            UploadId=media.Id,
            Media=media,

        };
    }

    public static SiteFileDto ToDto(this SiteFile model)
    {
        if (model == null) return new SiteFileDto();
        return new SiteFileDto
        {
           Id=model.Id,
           SiteFileType=model.SiteFileType!,
           Link=model.Link,
           FileUrl = model.FileUrl, 
           FileType = model.FileType,
           FileSize = model.FileSize,
           Alt = model.Alt,
           Extension=model.Extension,
           UploadDate = model.UploadDate,
        };
    }

    public static List<SiteFileDto> ToListDto(this List<SiteFile> models)
    {
        return models.Select(x => x.ToDto()).ToList();
    }




}

