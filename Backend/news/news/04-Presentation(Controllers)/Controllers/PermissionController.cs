using lms_dashboard._01_Domain.Model;
using lms_dashboard._02_Application.Interfaces;

using Microsoft.AspNetCore.Mvc;


namespace lms_dashboard._04_Presentation
{
    [Route("/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        public readonly IPermissionService _service;

        public PermissionController(IPermissionService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<List<PermissionDto>> GetAll()
        {
            return await _service.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<PermissionDto> Get(int id)
        {
            return await _service.Get(id);
        }

        [HttpPost("Save")]
        public async Task Save([FromBody] PermissionDto dto)
        {
            await _service.Save(dto);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Delete(id);
        }
    }
}
