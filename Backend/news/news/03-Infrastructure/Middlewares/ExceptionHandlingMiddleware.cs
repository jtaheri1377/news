namespace news._03_Infrastructure.Middlewares
{
    // Middleware/ExceptionHandlingMiddleware.cs
    using Microsoft.AspNetCore.Http;
    using System.Net;
    using System.Text.Json;
    using Microsoft.AspNetCore.Hosting; // برای دسترسی به IWebHostEnvironment
    using Microsoft.Extensions.Hosting; // برای دسترسی به Environments
    using news._01_Domain.Models_Entities_;

    namespace YourAppName.Middleware
    {
        public class ExceptionHandlingMiddleware
        {
            private readonly RequestDelegate _next;
            private readonly ILogger<ExceptionHandlingMiddleware> _logger;
            private readonly IWebHostEnvironment _env; // اضافه کردن IWebHostEnvironment

            public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger, IWebHostEnvironment env)
            {
                _next = next;
                _logger = logger;
                _env = env; // تزریق IWebHostEnvironment
            }

            public async Task InvokeAsync(HttpContext httpContext)
            {
                try
                {
                    await _next(httpContext);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An unhandled exception occurred.");
                    await HandleExceptionAsync(httpContext, ex, _env); // ارسال env به متد هندلینگ
                }
            }

            private static async Task HandleExceptionAsync(HttpContext context, Exception exception, IWebHostEnvironment env) // دریافت env
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // پیش‌فرض 500

                string errorMessage = "خطایی رخ داد، لطفاً دوباره تلاش کنید.";

                // اگر در محیط Development هستیم، پیام دقیق خطا رو نمایش بده.
                // در غیر این صورت (Production)، پیام عمومی رو نشون بده.
                if (env.IsDevelopment())
                {
                    errorMessage = exception.Message;
                    // اگر می‌خوای StackTrace رو هم در Dev ببینی:
                    // errorMessage += " | StackTrace: " + exception.StackTrace;
                }
                // else {
                //    errorMessage = "An unexpected error occurred. Please try again later."; // این خط دیگه نیازی نیست چون مقدار اولیه همین رو داره
                // }

                var errorResponse = new ErrorResponse
                {
                    StatusCode = context.Response.StatusCode,
                    Message = errorMessage // اینجا از پیام تعیین شده (دقیق یا عمومی) استفاده میشه
                };

                await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
            }
        }
    }
}
