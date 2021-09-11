using Microsoft.EntityFrameworkCore;
using NeoPay.Data.Models;

namespace NeoPay.Data
{
    public class NeoPayContext : DbContext
    {
        public NeoPayContext()
        {
        }

        public NeoPayContext(DbContextOptions<NeoPayContext> options)
            : base(options)
        {
        }

        DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var users = modelBuilder.Entity<User>();
            users.HasIndex(u => u.Email).IsUnique();
            users.HasIndex(u => u.Username).IsUnique();
        }
    }
}
