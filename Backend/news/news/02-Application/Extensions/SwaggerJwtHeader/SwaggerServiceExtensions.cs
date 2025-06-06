namespace UniversityIntegration._02_Application.Extensions.SwaggerJwtHeader
{
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.OpenApi.Models;

    namespace UniversityIntegration.Extensions
    {
        public static class ServiceCollectionExtensions
        {
            public static IServiceCollection AddSwaggerWithJwtAuth(this IServiceCollection services)
            {
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "University API", Version = "v1" });

                    // تعریف امنیت JWT
                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Name = "Authorization",
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer",
                        BearerFormat = "JWT",
                        In = ParameterLocation.Header,
                        Description = "Enter JWT token like: Bearer {your token here}"
                    });

                    // الزام به استفاده از JWT در هر ریکوئست
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
                });

                return services;
            }
        }
    }

}
