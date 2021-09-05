using Microsoft.EntityFrameworkCore;

namespace NeoPay.Data.Models
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
