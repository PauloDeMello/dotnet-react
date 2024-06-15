using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.MapControllers();

using var scope = app.Services.CreateScope(); //Create scope to access services (using -> dispose of services when finished)
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>(); //Add DataContext service to scope
    await context.Database.MigrateAsync(); //Applies pending migrations for the context to the database and creates database if not already existing
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>(); //Get logging service for Program file
    logger.LogError(ex, "An error occured during migration"); //Set logger to log error from this try catch.
    throw;
}

app.Run();
