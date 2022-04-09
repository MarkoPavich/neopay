using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Reflection;

namespace NeoPay
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            string basePath = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);

            var builder = Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

            builder.ConfigureAppConfiguration(configurationBuilder =>
            {
                configurationBuilder.SetBasePath(basePath);
                configurationBuilder.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
                configurationBuilder.AddEnvironmentVariables();
            });

            return builder;
        }
    }
}
