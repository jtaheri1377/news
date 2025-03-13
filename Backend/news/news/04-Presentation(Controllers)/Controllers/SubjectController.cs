using Microsoft.AspNetCore.Mvc;
using news._01_Domain.Models_Entities_.Subject;
using news._01_Domain.Unit;
using news._02_Application.Dto;
using news._02_Application.Interfaces;
using news._02_Application.Mapper.SubjectMapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await _subjectService.GetAll());

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var subject = await _subjectService.GetById(id);
            return subject == null ? NotFound() : Ok(subject);
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Save([FromBody] SubjectDto subjectDto)
        {
            var result = await _subjectService.Save(subjectDto.ToModel());
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _subjectService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
