using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace NeoPay.Models
{
    public class Context: DbContext
    {
        private readonly IConfiguration Configuration;

        public Context(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer();
            //optionsBuilder.UseSqlServer(Configuration["ConnectionStrings:default"]);
        }
    }
}
