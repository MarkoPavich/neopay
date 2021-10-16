
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Data.Entities;

namespace NeoPay.Data.EntityConfiguration
{
    public class NeoPayUserConfiguration : IEntityTypeConfiguration<NeoPayUser>
    {
        public void Configure(EntityTypeBuilder<NeoPayUser> builder)
        {
            builder.HasMany<Invoice>(g => g.Invoices)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.Id);

        }
    }
}
