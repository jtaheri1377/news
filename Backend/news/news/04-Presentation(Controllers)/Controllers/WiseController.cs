using lms_dashboard._04_Presentation.Filters;
using Microsoft.AspNetCore.Mvc;
using news._02_Application.Dto;
using news._02_Application.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class WiseController : ControllerBase
    {
        private readonly IWiseService _wiseService;

        public WiseController(IWiseService wiseService)
        {
            _wiseService = wiseService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] int skip = 0, [FromQuery] int take = 6) => Ok(await _wiseService.GetAll(skip, take));

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var wise = await _wiseService.Get(id);
            return wise == null ? NotFound() : Ok(wise);
        }

        [HttpPost("Save")]
        [HasPermission("WISE_SAVE")]
        public async Task<IActionResult> Save([FromBody] WiseDto wise)
        {
            var result = await _wiseService.Save(wise);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        [HasPermission("WISE_DELETE")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _wiseService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
