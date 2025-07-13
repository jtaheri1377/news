using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using news._03_Infrastructure.Repositories;
using System.Security.Claims;

namespace lms_dashboard._04_Presentation.Filters
{

    public class HasPermissionAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string _permission;

        public HasPermissionAttribute(string permission)
        {
            _permission = permission;
        }

        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // گرفتن userId از claims
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // گرفتن dbContext از DI container
            var db = context.HttpContext.RequestServices.GetRequiredService<NewsDbContext>();
            var userIdInt = int.Parse(userId);

            // فقط همین کوئری سبک و تمیز
            var hasPermission = await db.Users
                .Where(u => u.Id == userIdInt)
                .SelectMany(u => u.Roles.SelectMany(r => r.Permissions))
                .AnyAsync(p => p.Name == _permission);

            if (!hasPermission)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}