using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace news._02_Application.Extensions
{
    public static class ServicesReflection
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();

            // دریافت تمام کلاس‌هایی که با "Service" ختم می‌شوند و دارای اینترفیس متناظر هستند
            var serviceTypes = assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Service"))
                .Select(t => new
                {
                    Implementation = t,
                    Interface = t.GetInterfaces().FirstOrDefault(i => i.Name == $"I{t.Name}")
                })
                .Where(t => t.Interface != null);

            // ثبت خودکار سرویس‌ها در DI Container
            foreach (var type in serviceTypes)
            {
                services.AddScoped(type.Interface!, type.Implementation);
            }
        }
    }
}
