using Microsoft.AspNetCore.Mvc;
using news._02_Application.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await _newsService.GetAll());

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var news = await _newsService.GetById(id);
            return news == null ? NotFound() : Ok(news);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromBody] NewsModel news)
        {
            var result = await _newsService.Update(news);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _newsService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
