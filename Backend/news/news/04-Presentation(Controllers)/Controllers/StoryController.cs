using Microsoft.AspNetCore.Mvc;
using news._01_Domain.Wise;
using news._02_Application.Dto;
using news._02_Application.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class StoryController : ControllerBase
    {
        private readonly IStoryService _storyService;

        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await _storyService.GetAll());

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var wise = await _storyService.Get(id);
            return wise == null ? NotFound() : Ok(wise);
        }
       
        [HttpGet("GetProvinceByStoryId/{id}")]
        public async Task<IActionResult> GetProvinceById(int id)
        {
            var wise = await _storyService.GetProvinceByStoryId(id);
            return wise == null ? NotFound() : Ok(wise);
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Update([FromBody] StorySaveDto story)
        {
            var result = await _storyService.Save(story);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _storyService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
