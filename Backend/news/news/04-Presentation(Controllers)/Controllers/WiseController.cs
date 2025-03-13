using Microsoft.AspNetCore.Mvc;
using news._01_Domain.Wise;
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
        public async Task<IActionResult> GetAll() => Ok(await _wiseService.GetAll());

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var wise = await _wiseService.Get(id);
            return wise == null ? NotFound() : Ok(wise);
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Update([FromBody] WiseDto wise)
        {
            var result = await _wiseService.Save(wise);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _wiseService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
