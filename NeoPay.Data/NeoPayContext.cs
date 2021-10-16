using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using NeoPay.Data.Entities;

namespace NeoPay.Data
{
    public class NeoPayContext : IdentityDbContext
    {
        public NeoPayContext(DbContextOptions<NeoPayContext> options)
            : base(options)
        {
        }

        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Contact> ContactInfo { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
        public DbSet<Payer> Payers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Required for identityUser to be able to build its tables
            base.OnModelCreating(builder); 

            builder.ApplyConfigurationsFromAssembly(typeof(NeoPayContext).Assembly);  // Specify configuration is in same assembly
        }

    }
}
