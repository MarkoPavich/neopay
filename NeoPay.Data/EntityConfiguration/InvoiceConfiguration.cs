using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Data.Entities;

namespace NeoPay.Data.EntityConfiguration
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.HasOne(s => s.User)
                .WithMany(a => a.Invoices)
                .HasForeignKey(s => s.UserId)
                .IsRequired();
        }
    }
}
