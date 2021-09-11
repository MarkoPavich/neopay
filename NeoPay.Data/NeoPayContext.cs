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
    }
}
