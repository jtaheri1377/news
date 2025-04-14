using news._01_Domain.Models_Entities_.Story;
using news._02_Application.Dto;

namespace news._02_Application.Mapper.StoryMapper
{
    public static class StoryMapper
    {
        public static StoryDto ToDto(this Story story)
        {
            return new StoryDto
            {
                Id = story.Id,
                Description = story.Description,
                Dislikes = story.Dislikes,
                Likes = story.Likes,
                Hearts = story.Hearts,
                PublishedDate = TimeZoneInfo.ConvertTimeFromUtc(
                                   story.PublishedDate,
                                   TimeZoneInfo.FindSystemTimeZoneById("Iran Standard Time")
                                   ),
                Title = story.Title,
                Reviews = story.Reviews,
                Medias = story.Medias.ToMediaGalleryListDto(),
                Province = story.Province != null ? story.Province.Name : null,
            };

        }

        public static List<StoryDto> ToListDto(this List<Story> stories)
        {
            return stories.Select(x => x.ToDto()).ToList();
        }

        public static Story ToModel(this StorySaveDto story)
        {
            return new Story
            {
                Id = story.Id,
                Description = story.Description,
                Dislikes = 0,
                Likes = 0,
                Hearts = 0,
                PublishedDate = DateTime.UtcNow,
                Title = story.Title,
                Reviews = 0,
                ProvinceId = story.ProvinceId,
            };
        }
    }
}