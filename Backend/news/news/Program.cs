using Microsoft.EntityFrameworkCore;
using news._03_Infrastructure.Repositories;
using news._02_Application.Extensions;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http.Features;
using news._02_Application.Settings;
using UniversityIntegration._02_Application.Extensions.SwaggerJwtHeader.UniversityIntegration.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<NewsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Service Reflection Extension
builder.Services.AddApplicationServices();



builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });


builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

// 👇 فقط با یه خط JWT و Swagger رو پیکربندی می‌کنیم
builder.Services.AddJwtAuthentication(builder.Configuration);

//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerWithJwtAuth();


//builder.Services.AddSwaggerGen(c =>
//{
//    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//    {
//        Description = "فرمت: Bearer {your_token_here}",
//        Name = "Authorization",
//        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
//        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey
//    });

//    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
//    {
//        {
//            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//            {
//                Reference = new Microsoft.OpenApi.Models.OpenApiReference
//                {
//                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            new string[] {}
//        }
//    });
//});



builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100 * 1024 * 1024; // 100MB یا بیشتر
});

// برای خود سرور Kestrel هم باید ست بشه
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 100 * 1024 * 1024; // 100MB
});




// اضافه کردن Authorization
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseStaticFiles();
// فعال‌سازی احراز هویت و مجوزدهی
app.UseAuthentication();
app.UseAuthorization();

app.UseCors(a =>
{
    a.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
});



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
