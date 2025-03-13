using Microsoft.AspNetCore.Mvc;
using news._01_Domain.Unit;
using news._02_Application.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class UnitController : ControllerBase
    {
        private readonly IUnitService _unitService;

        public UnitController(IUnitService unitService)
        {
            _unitService = unitService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await _unitService.GetAll());

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var unit = await _unitService.GetById(id);
            return unit == null ? NotFound() : Ok(unit);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromBody] Unit unit)
        {
            var result = await _unitService.Update(unit);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _unitService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
