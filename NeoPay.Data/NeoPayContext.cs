using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using NeoPay.Data.Models;

namespace NeoPay.Data
{
    public class NeoPayContext : IdentityDbContext
    {
        public NeoPayContext()
        {
        }

        public NeoPayContext(DbContextOptions<NeoPayContext> options)
            : base(options)
        {
        }
    }
}
