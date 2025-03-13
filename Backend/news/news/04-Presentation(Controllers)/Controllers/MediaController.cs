using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using news._01_Domain.Models_Entities_.Media;
using news._02_Application.Interfaces;

namespace news._04_Presentation_Controllers_.Controllers
{
   
    [ApiController]
    [Route("[controller]")]
    public class MediaController : ControllerBase
    {
        private readonly IMediaService _mediaService;

        public MediaController(IMediaService mediaService)
        {
            _mediaService = mediaService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _mediaService.GetAll());
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var media = await _mediaService.GetById(id);
            return media == null ? NotFound() : Ok(media);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromBody] Media media)
        {
            var result = await _mediaService.Update(media);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _mediaService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
