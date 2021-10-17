
using Microsoft.EntityFrameworkCore;
using NeoPay.Data.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public class InvoiceRepository: Repository<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(NeoPayContext context)
           : base(context)
        {
        }

        public Task Complete()
        {
            return base.SaveChanges();
        }

        public override async Task<Invoice> AddAsync(Invoice invoice)
        {
            await base.AddAsync(invoice);
            await SaveChanges();
            return invoice;
        }

        public async Task<Invoice> GetByIdAsync(string invoiceId)
        {
            var invoice = base.GetAll().Where(a => a.Id == invoiceId)
                .Include(s => s.BillFrom)
                .Include(s => s.BillTo)
                .Include(s => s.Items)
                .FirstOrDefault();
            await SaveChanges();

            return invoice;
        }
    }
}
