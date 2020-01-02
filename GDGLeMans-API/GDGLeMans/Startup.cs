using GDGLeMans.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using Newtonsoft.Json.Serialization;
using System;

namespace GDGLeMans
{
    public class Startup
    {

        readonly string AllowSpecificOrigins = "_allowSpecificOrigins";
        private readonly ILogger<Startup> _logger;

        public Startup(IHostEnvironment env, IConfiguration configuration, ILogger<Startup> Logger)
        {
            Conf = configuration;
            Env = env;
            _logger = Logger;
        }

        public IConfiguration Conf { get; }
        public IHostEnvironment Env { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            _logger.LogDebug("\n\n\n\n\n"+System.Environment.GetEnvironmentVariables().ToString() + "\n\n\n\n\n");
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority ="host=gdglemansdb.postgres.database.azure.com port=5432 dbname=gdglemansdb user=gdglemans@gdglemansdb password=WiMTMxuvT5ZLg07j sslmode=require";
                o.Audience = Environment.GetEnvironmentVariable("ASPNETCORE_AUDIENCE");
                o.RequireHttpsMetadata = Convert.ToBoolean(Environment.GetEnvironmentVariable("ASPNETCORE_REQUIRE_HTTPS_METADATA"));

                o.Events = new JwtBearerEvents()
                {
 
                    OnAuthenticationFailed = c =>
                    {
                        c.NoResult();
                        c.Response.StatusCode = 500;
                        c.Response.ContentType = "text/plain";
                        if (Env.IsDevelopment())
                        {
                            return c.Response.WriteAsync(c.Exception.ToString());
                        }
                        return c.Response.WriteAsync("An error occured processing your authentication.");
                    }
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Administrator", policy => policy.RequireClaim("user_roles", "[Admin]"));
            });

            services.AddCors(options =>
            {
                options.AddPolicy(AllowSpecificOrigins,
                builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
            services.AddMvc()
                // To ensure capitalization is not lost 
                .AddNewtonsoftJson(options =>
                {
                    var resolver = options.SerializerSettings.ContractResolver;
                    if (resolver != null)
                    {
                        (resolver as DefaultContractResolver).NamingStrategy = null;
                    }
                });
            services.AddDbContext<GDGContext>(options =>
                options.UseNpgsql(Environment.GetEnvironmentVariable("ASPNETCORE_CONNECTION_STRING")));
            services.AddControllers();

            services.AddLogging();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostEnvironment env, ILoggerFactory loggerFactory)
        {
            IdentityModelEventSource.ShowPII = true;
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<GDGContext>();
                //context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
            }

            app.UseCors(AllowSpecificOrigins);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

           

        }
    }
}
