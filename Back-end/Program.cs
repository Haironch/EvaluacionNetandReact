using Back_end.Models;
using Back_end.Services;
using Back_end.Middleware;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<DatabaseSettings>(
    builder.Configuration.GetSection("DatabaseSettings"));

builder.Services.AddSingleton<DatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);

builder.Services.AddSingleton<StudentService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",  // Cambiado el nombre para que coincida
        builder =>
        {
            builder
                .WithOrigins("http://localhost:5173") // Especifica el origen de tu aplicación React
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// El orden es importante
app.UseHttpsRedirection();
// CORS debe ir antes de la autenticación y autorización
app.UseCors("AllowReact");
app.UseMiddleware<ApiKeyMiddleware>();
app.UseAuthorization();
app.MapControllers();

app.Run();