using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using news._03_Infrastructure.Repositories;
using System.Security.Claims;
using System.Threading.Tasks; // حتماً این using را اضافه کنید

namespace lms_dashboard._04_Presentation.Filters
{
    public class HasPermissionAttribute : Attribute, IAsyncAuthorizationFilter // تغییر به IAsyncAuthorizationFilter
    {
        private readonly string _permission;

        public HasPermissionAttribute(string permission)
        {
            _permission = permission;
        }

        // تغییر از async void OnAuthorization به async Task OnAuthorizationAsync
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult(); // کاربر احراز هویت نشده (401)
                return;
            }

            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                context.Result = new UnauthorizedResult(); // userId در Claims وجود ندارد (401)
                return;
            }

            // دریافت DbContext از سرویس‌های تزریق وابستگی (Dependency Injection)
            var db = context.HttpContext.RequestServices.GetRequiredService<NewsDbContext>();
            var userIdInt = int.Parse(userId);

            // اجرای کوئری به صورت ناهمگام
            var hasPermission = await db.Users
                .Where(u => u.Id == userIdInt)
                .SelectMany(u => u.Roles.SelectMany(r => r.Permissions))
                .AnyAsync(p => p.Name == _permission);

            if (!hasPermission)
            {
                context.Result = new ForbidResult(); // کاربر احراز هویت شده اما مجوز ندارد (403)
                return; // پایان دادن به اجرای فیلتر و Pipeline
            }

            // اگر کاربر مجوز داشت، هیچ کاری نکنید تا Pipeline ادامه پیدا کند
        }
    }
}