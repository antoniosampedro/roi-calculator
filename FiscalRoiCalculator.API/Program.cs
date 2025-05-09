using FiscalRoiCalculator.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Uncommented
builder.Services.AddSwaggerGen(); // Uncommented

// Register our services
builder.Services.AddScoped<IRoiCalculatorService, RoiCalculatorService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000", "http://localhost:8080") // Reverted to HTTP origins
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Uncommented
    app.UseSwaggerUI(); // Uncommented
}

// app.UseHttpsRedirection(); // Reverted: Commented out for HTTP setup
app.UseCors("AllowReactApp");
app.UseAuthorization(); // Re-enabled
app.MapControllers();

app.Run();
