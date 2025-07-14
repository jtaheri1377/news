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
        [HttpGet("GetAllByToken")]
        public async Task<IActionResult> GetAllByToken()
        {
            // اینجا _service.GetAll() حالا List<PermissionDto> برمی‌گرداند
            var permissions = await _service.GetAllByToken();

            // از متد Ok() برای برگرداندن پاسخ HTTP 200 OK با داده‌های JSON استفاده کنید
            return Ok(permissions);
        }

        [HttpGet("GetAll")]
        public async Task<List<PermissionDto>> GetAll()
        {
            // اینجا _service.GetAll() حالا List<PermissionDto> برمی‌گرداند
            return await _service.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<PermissionDto> Get(int id)
        {
            return await _service.Get(id);
        }

        [HttpPost("Save")]
        public async Task Save([FromBody] PermissionSaveDto dto)
        {
            await _service.Save(dto);
        }

        [HttpGet("GetTree")]
        public async Task<IActionResult> GetTree()
        {
            var tree = await _service.GetTree();
            return Ok(tree);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Delete(id);
        }
    }
}
