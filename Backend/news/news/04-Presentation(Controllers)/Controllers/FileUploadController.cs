using System.Diagnostics;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using news._01_Domain.Models_Entities_.Media;
using news._03_Infrastructure.Repositories;

namespace news._04_Presentation_Controllers_.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly NewsDbContext _db;
        private readonly string _uploadPath;

        public FileUploadController(NewsDbContext db, IWebHostEnvironment env, IConfiguration config)
        {
            _db = db;
            _env = env ?? throw new ArgumentNullException(nameof(env));
            _uploadPath = config["FileSettings:UploadPath"] ?? "wwwroot/uploads";
        }

 

        [HttpPost("upload-multiple")]
        [HttpPost]
        [RequestFormLimits(MultipartBodyLengthLimit = 100_000_000)] // افزایش محدودیت درخواست فقط برای این اکشن (optional ولی مفیده)
        public async Task<IActionResult> UploadMultipleFiles(
                             [FromForm] List<IFormFile> files,
                             [FromForm] string? alt,
                             [FromForm] int? maxFileSizeMb = 100)
        {
            if (files == null || files.Count == 0)
                return BadRequest("هیچ فایلی انتخاب نشده است.");

            var uploadedFiles = new List<object>();

            // حداکثر سایز بر اساس ورودی یا پیش‌فرض
            long maxFileSize = (maxFileSizeMb.Value) * 1024 * 1024;

            var allowedExtensions = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        // فرمت‌های مجاز (اینجا تغییری ندادم چون لیستت خوب بود)
        { ".jpg", "Image" }, { ".jpeg", "Image" }, { ".png", "Image" }, { ".gif", "Image" },
        { ".bmp", "Image" }, { ".tiff", "Image" }, { ".webp", "Image" }, { ".svg", "Image" }, { ".heic", "Image" },
        { ".mp4", "Video" }, { ".avi", "Video" }, { ".mov", "Video" }, { ".wmv", "Video" },
        { ".flv", "Video" }, { ".mkv", "Video" }, { ".webm", "Video" },
        { ".mp3", "Audio" }, { ".wav", "Audio" }, { ".aac", "Audio" }, { ".ogg", "Audio" },
        { ".flac", "Audio" }, { ".wma", "Audio" },
        { ".pdf", "Document" }, { ".doc", "Document" }, { ".docx", "Document" }, { ".xls", "Document" },
        { ".xlsx", "Document" }, { ".ppt", "Document" }, { ".pptx", "Document" }, { ".txt", "Document" },
        { ".rtf", "Document" }, { ".epub", "Document" }, { ".mobi", "Document" }, { ".csv", "Document" }
    };

            foreach (var file in files)
            {
                if (file == null || file.Length == 0)
                    continue;

                if (file.Length > maxFileSize)
                    return BadRequest($"حجم فایل '{file.FileName}' بیشتر از حد مجاز است (حداکثر {maxFileSizeMb} مگابایت).");

                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!allowedExtensions.TryGetValue(extension, out var fileType))
                    return BadRequest($"فرمت فایل '{file.FileName}' مجاز نیست.");

                var safeFileName = GenerateSafeFileName(Path.GetFileNameWithoutExtension(file.FileName));
                var uniqueFileName = $"{safeFileName}_{Guid.NewGuid()}{extension}";
                var uploadDirectory = Path.Combine(_uploadPath);

                if (!Directory.Exists(uploadDirectory))
                    Directory.CreateDirectory(uploadDirectory);

                var filePath = Path.Combine(uploadDirectory, uniqueFileName);

                try
                {
                    await using var stream = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(stream);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"خطا در ذخیره فایل '{file.FileName}': {ex.Message}");
                }

                var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";

                var media = new Media
                {
                    FileName = file.FileName,
                    FileUrl = fileUrl,
                    Extension = extension,
                    FileType = fileType,
                    UploadDate = DateTime.UtcNow,
                    Alt = alt,
                    FileSize = file.Length
                };

                _db.Medias.Add(media);
                await _db.SaveChangesAsync();

                uploadedFiles.Add(new
                {
                    media.Id,
                    media.FileName,
                    media.FileUrl,
                    media.Extension,
                    media.FileType,
                    media.Alt,
                    media.FileSize,
                    UploadDate = media.UploadDate.ToString("yyyy-MM-ddTHH:mm:ss")
                });
            }

            return Ok(uploadedFiles);
        }



        private bool IsValidMimeType(IFormFile file, string fileType)
        {
            var mimeTypes = new Dictionary<string, string[]>
            {
                { "Image", new[] { "image/jpeg", "image/png", "image/gif" } },
                { "Video", new[] { "video/mp4", "video/x-msvideo", "video/quicktime" } },
                { "Audio", new[] { "audio/mpeg", "audio/wav" } }
            };

            return mimeTypes.ContainsKey(fileType) && mimeTypes[fileType].Contains(file.ContentType);
        }

        private string GenerateSafeFileName(string fileName)
        {
            fileName = fileName.Normalize(NormalizationForm.FormD);
            fileName = Regex.Replace(fileName, @"[^a-zA-Z0-9-_]", "_");
            return fileName.Length > 50 ? fileName.Substring(0, 50) : fileName;
        }

        private string? GetMediaDuration(string filePath)
        {
            try
            {
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "ffmpeg",
                        Arguments = $"-i \"{filePath}\" 2>&1",
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                };

                process.Start();
                var output = process.StandardError.ReadToEnd();
                process.WaitForExit();

                // لاگ گرفتن از خروجی برای دیباگ
                Console.WriteLine("FFmpeg Output: " + output);

                var match = Regex.Match(output, @"Duration: (\d{2}:\d{2}:\d{2}.\d{2})");
                return match.Success ? match.Groups[1].Value : null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in GetMediaDuration: " + ex.Message);
                return null;
            }
        }


        private bool GenerateVideoThumbnail(string videoPath, string thumbnailPath)
        {
            try
            {
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "ffmpeg",
                        Arguments = $"-i \"{videoPath}\" -ss 00:00:01 -vframes 1 \"{thumbnailPath}\"",
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                };

                process.Start();
                process.WaitForExit();
                //Console.WriteLine("FFmpeg Thumbnail Output: " + output);

                return System.IO.File.Exists(thumbnailPath);
            }
            catch
            {
                return false;
            }
        }
    }
}
