﻿using lms_dashboard._04_Presentation.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using news._02_Application.Interfaces;
using news._02_Application.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        private readonly IBannerService _bannerService;

        public BannerController(IBannerService BannerService)
        {
            _bannerService = BannerService;
        }
        

        [HttpGet("Get/{CategoryCode}")]
        //[HasPermission("BANNER_LIST")]
        public async Task<IActionResult> GetByCategoryId( int CategoryCode)
        {
            var result = await _bannerService.Get(CategoryCode);
            return Ok(result);
        }



        //[HttpGet("GetAll")]
        ////[Authorize(Roles = "Admin")]
        //public async Task<List<NewsSummaryDto>> GetAll()
        //{
        //    return await _newsService.GetAll();
        //}

        //[HttpGet("Get/{id}")]
        //public async Task<IActionResult> GetById(int id)
        //{
        //    var news = await _newsService.GetById(id);
        //    return news == null ? NotFound() : Ok(news);
        //}

        [HttpPost("Save")]
        //[Authorize]
        [HasPermission("BANNER_SAVE")]

        public async Task<IActionResult> Save([FromBody] BannerSaveDto dto)
        {
            var result = await _bannerService.Save(dto);
            if (result == null)
                return NotFound();
            return Ok(result);
        }



        [HttpDelete("{id}")]
        [HasPermission("BANNER_DELETE")]

        public async Task<IActionResult> Delete(int id)
        {
            var success = await _bannerService.Delete(id);
            return success ? NoContent() : NotFound();
        }

    }
}
