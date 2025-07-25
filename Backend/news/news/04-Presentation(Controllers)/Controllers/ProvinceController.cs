﻿using lms_dashboard._04_Presentation.Filters;
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

        [HttpGet("GetAllByToken")]
        public async Task<IActionResult> GetAllByToken() => Ok(await _provinceService.GetAllByToken());
       
        
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await _provinceService.GetAll());

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var province = await _provinceService.GetById(id);
            return province == null ? NotFound() : Ok(province);
        }

        [HttpGet("GetProvinces")]
        public async Task<IActionResult> GetProvinces()
        {
            var tree = await _provinceService.GetProvinces();
            return Ok(tree);
        }

        [HttpGet("GetCounties/{id}")]
        public async Task<IActionResult> GetCounties(int id)
        {
            var tree = await _provinceService.GetCounties(id);
            return Ok(tree);
        }

        [HttpGet("GetTree")]
        public async Task<IActionResult> GetTree()
        {
            var tree = await _provinceService.GetTree();
            return Ok(tree);
        }

        [HttpPost("Save")]
        [HasPermission("PROVINCE_SAVE")]
        public async Task<IActionResult> Save([FromBody] ProvinceSaveDto dto)
        {
            var result = await _provinceService.Save(dto);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        [HasPermission("PROVINCE_DELETE")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _provinceService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
