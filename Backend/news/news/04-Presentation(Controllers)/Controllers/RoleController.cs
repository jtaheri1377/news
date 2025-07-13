using lms_dashboard._01_Domain.Model;
using lms_dashboard._02_Application.Interfaces;

using Microsoft.AspNetCore.Mvc;


namespace lms_dashboard._04_Presentation
{
    [Route("/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        public readonly IRoleService _service;

        public RoleController(IRoleService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<List<RoleDto>> GetAll()
        {
            return await _service.GetAll();
        }

        //[HttpGet("GetListByMajorId/{id}")]
        //public async Task<List<RoleDto>> GetListByMajorId(int id)
        //{
        //    return await _service.GetListByMajorId(id);
        //}

        [HttpGet("{id}")]
        public async Task<RoleDto> Get(int id)
        {
            return await _service.Get(id);
        }

        [HttpPost("Save")]
        public async Task Save([FromBody] RoleSaveDto dto)
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
