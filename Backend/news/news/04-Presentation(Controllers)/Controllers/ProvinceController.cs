using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using news._01_Domain.Models_Entities_.Province;
using news._02_Application.Interfaces;

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class ProvinceController : Controller
    {
        private readonly IProvinceService _provinceService;
        public ProvinceController(IProvinceService provinceService)
        {
            _provinceService = provinceService;
        }

        [HttpGet("GetAll")]
        public async Task<List<Province>> GetAll() => await _provinceService.GetAll();

               [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var province = await _provinceService.GetById(id);
            return province == null ? NotFound() : Ok(province);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromBody] Province province)
        {
            var result = await _provinceService.Update(province);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _provinceService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
