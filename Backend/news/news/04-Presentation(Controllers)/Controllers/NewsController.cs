﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using news._02_Application.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet("/Province/GetSummaryPublic")]
        public async Task<List<NewsSummaryDto>> GetSummaryPublicProvinceNews()
        {
            return await _newsService.GetAll();
        }

        [HttpGet("GetByCategoryId")]
        public async Task<IActionResult> GetLatest([FromQuery] int categoryId, [FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            var result = await _newsService.GetLatestNews(categoryId, skip, take);
            return Ok(result);
        }


        //HttpGet("/Province/GetRecent")]
        //public async Task<List<NewsSummaryDto>> GetSummaryPublicProvinceNews()
        //{
        //    return await _newsService.GetAll();
        //}
        //HttpGet("/Province/GetSummaryPublic")]
        //public async Task<List<NewsSummaryDto>> GetSummaryPublicProvinceNews()
        //{
        //    return await _newsService.GetAll();
        //}
        [HttpGet("GetAll")]
        //[Authorize(Roles = "Admin")]
        public async Task<List<NewsSummaryDto>> GetAll()
        {
            return await _newsService.GetAll();
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var news = await _newsService.GetById(id);
            return news == null ? NotFound() : Ok(news);
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Save([FromBody] NewsSaveDto newsDto)
        {
            var result = await _newsService.Save(newsDto);
            if (result == null)
                return NotFound();
            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _newsService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
