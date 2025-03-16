using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

         
        private readonly string _uploadPath;
        public FileUploadController(IWebHostEnvironment env, IConfiguration config)
        {
            _env = env ?? throw new ArgumentNullException(nameof(env));
            _uploadPath = config["FileSettings:UploadPath"] ?? "wwwroot/uploads";
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            Console.WriteLine($"WebRootPath: {_env.WebRootPath}");

            if (string.IsNullOrEmpty(_env.WebRootPath))
            {
                _env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                Console.WriteLine($"WebRootPath مقداردهی شد: {_env.WebRootPath}");
            }
            if (string.IsNullOrEmpty(_uploadPath))
                throw new ArgumentNullException(nameof(_uploadPath), "UploadPath در appsettings.json مقداردهی نشده است.");


            if (file == null || file.Length == 0)
                return BadRequest("فایلی انتخاب نشده است.");

            // محدودیت فرمت و حجم
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".mp4", ".pdf" };
            var maxSize = 50 * 1024 * 1024; // حداکثر 50 مگابایت

            var extension = Path.GetExtension(file.FileName).ToLower();
            if (!allowedExtensions.Contains(extension))
                return BadRequest("فرمت فایل مجاز نیست.");

            if (file.Length > maxSize)
                return BadRequest("حجم فایل بیش از حد مجاز است.");

            var uploadPath = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
                Console.WriteLine($"مسیر ایجاد شد: {uploadPath}");
            }

            var uniqueFileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(uploadPath, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";
            return Ok(new FileUploadResult { FileName = uniqueFileName, FileUrl = fileUrl });
        }

        //[HttpPost("upload")]
        //public async Task<IActionResult> UploadFile(IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //        return BadRequest("فایلی انتخاب نشده است.");

        //    if (string.IsNullOrEmpty(_uploadPath))
        //        return StatusCode(500, "مسیر ذخیره‌سازی تنظیم نشده است.");

        //    var fullPath = Path.Combine(Directory.GetCurrentDirectory(), _uploadPath);
        //    if (!Directory.Exists(fullPath))
        //        Directory.CreateDirectory(fullPath);

        //    var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        //    var filePath = Path.Combine(fullPath, uniqueFileName);

        //    using (var stream = new FileStream(filePath, FileMode.Create))
        //    {
        //        await file.CopyToAsync(stream);
        //    }

        //    var fileUrl = $"{Request.Scheme}://{Request.Host}/{_uploadPath.Replace("wwwroot/", "")}/{uniqueFileName}";
        //    return Ok(new { FileName = uniqueFileName, FileUrl = fileUrl });
        //}

    }
}


//using Microsoft.AspNetCore.Mvc;

//[ApiController]
//[Route("api/[controller]")]
//public class FileUploadController : ControllerBase
//{
//    private readonly string _uploadPath;

//    public FileUploadController(IConfiguration config)
//    {
//        _uploadPath = config["FileSettings:UploadPath"] ?? throw new ArgumentNullException("UploadPath is not set.");
//    }

//    [HttpPost("Upload")]
//    public async Task<IActionResult> UploadFile(IFormFile file)
//    {
//        if (file == null || file.Length == 0)
//            return BadRequest("فایلی ارسال نشده است.");

//        var filePath = Path.Combine(Directory.GetCurrentDirectory(), _uploadPath, file.FileName);

//        using (var stream = new FileStream(filePath, FileMode.Create))
//        {
//            await file.CopyToAsync(stream);
//        }

//        return Ok(new { message = "فایل با موفقیت آپلود شد.", filePath });
//    }
//}
