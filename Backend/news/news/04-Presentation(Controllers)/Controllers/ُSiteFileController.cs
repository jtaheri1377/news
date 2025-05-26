using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using news._01_Domain.Enum;
using news._02_Application.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class SiteFileController : ControllerBase
    {
        private readonly ISiteFileService _SiteFileService;

        public SiteFileController(ISiteFileService SiteFileService)
        {
            _SiteFileService = SiteFileService;
        }

       

        [HttpGet("Get/{SiteFileType}")]
        public async Task<IActionResult> GetByCategoryId(SiteFileType SiteFileType)
        {
            var result = await _SiteFileService.Get(SiteFileType);
            return Ok(result);
        }



        //[HttpGet("GetAll")]
        ////[Authorize(Roles = "Admin")]
        //public async Task<List<NewsSummaryDto>> GetAll()
        //{
        //    return await _newsService.GetAll();
        //}

        //[HttpGet("Get/{id}")]
        //public async Task<IActionResult> GetById(int id)
        //{
        //    var news = await _newsService.GetById(id);
        //    return news == null ? NotFound() : Ok(news);
        //}

        [HttpPost("Save")]
        public async Task<IActionResult> Save([FromBody] SiteFileSaveDto dto)
        {
            var result = await _SiteFileService.Save(dto);
            if (result == null)
                return NotFound();
            return Ok(result);
        }


        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var success = await _newsService.Delete(id);
        //    return success ? NoContent() : NotFound();
        //}
    }
}
