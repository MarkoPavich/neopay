using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using NeoPay.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using NeoPay.Service.Services.Auth;
using NeoPay.Data.Entities;
using NeoPay.Data.Repositories;
using NeoPay.Service.services;
using Microsoft.AspNetCore.HttpOverrides;
using System;
using System.Security.Cryptography;

namespace NeoPay
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            #region DbContext
            services.AddDbContext<NeoPayContext>(options =>
            {
                // Connects to MariaDb server instance running on RaspberyPi server - connection string stored in secrets
                options.UseMySql(Configuration["ConnectionStrings:RpiMariaDb"], ServerVersion.AutoDetect(Configuration["ConnectionStrings:RpiMariaDb"]));
            });

            #endregion

            #region CORS

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    //builder.WithOrigins("https://neopay.local")
                    //    .AllowCredentials()
                    //    .AllowAnyHeader()
                    //    .AllowAnyMethod();

                    builder.AllowAnyOrigin()  // TODO - define allowed origins 
                        .AllowAnyMethod()     // TODO - debug firefox
                        .AllowAnyHeader();
                });
            });

            #endregion

            // Use Microsoft IdentityUser solution
            services.AddIdentity<NeoPayUser, IdentityRole>(options =>
            {
                options.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<NeoPayContext>();

            services.AddControllers();

            #region DI registrations

            // DI registrations
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();
            services.AddScoped<ITokenRepository, TokenRepository>();

            services.AddScoped<IInvoiceService, InvoiceService>();
            services.AddScoped<ITokenService, TokenService>();

            services.AddSingleton<RsaSecurityKey>(provider =>
            {
                RSA rsa = RSA.Create();
                return new RsaSecurityKey(rsa);
            });

            #endregion

            #region Authentication
            services.AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
                .Configure<RsaSecurityKey>((options, rsa) => // Use DI in startup via .Configure
                {
                    options.SaveToken = false;
                    options.RequireHttpsMetadata = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Audience"],
                        IssuerSigningKey = rsa
                    };
                });

            services.AddAuthentication(options => 
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer();
            #endregion

            // Allows using HttpContext in other layers
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                ForwardedHeaders.XForwardedProto
            });

            app.UseCors();

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
