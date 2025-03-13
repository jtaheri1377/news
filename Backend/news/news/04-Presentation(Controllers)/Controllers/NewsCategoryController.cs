using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using news._02_Application.Dto;
using news._02_Application.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
     
    [ApiController]
    [Route("/[controller]")]
    public class NewsCategoryController : ControllerBase
    {
        private readonly INewsCategoryService _service;

        public NewsCategoryController(INewsCategoryService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var dtos = await _service.GetAll();
            return Ok(dtos);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var dto = await _service.Get(id);
            return dto == null ? NotFound() : Ok(dto);
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Save([FromBody] NewsCategoryDto dto)
        {
            var result = await _service.Save(dto);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }

}
