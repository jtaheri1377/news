using lms_dashboard._04_Presentation.Filters;
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

        [HttpGet("GetParents")]

        public async Task<IActionResult> GetParents()
        {
            var dtos = await _service.GetParents();
            return Ok(dtos);
        }

        [HttpGet("GetChildsByCode/{Code}")]
        public async Task<IActionResult> GetChilds(int Code)
        {
            var dtos = await _service.GetChilds(Code);
            return Ok(dtos);
        }

        [HttpGet("Get/{Code}")]
        public async Task<IActionResult> Get(int Code)
        {
            var dto = await _service.Get(Code);
            return dto == null ? NotFound() : Ok(dto);
        }

        [HttpPost("Save")]
        [HasPermission("NEWSCATEGORY_SAVE")]
        public async Task<IActionResult> Save([FromBody] NewsCategoryDto dto)
        {
            var result = await _service.Save(dto);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        [HasPermission("NEWSCATEGORY_DELETE")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }

}
