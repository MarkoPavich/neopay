
using NeoPay.Data.Entities;

namespace NeoPay.Data.Repositories
{
    public class InvoiceRepository: Repository<Invoice>, IInvoiceRepository
    {
        protected readonly NeoPayContext context;

        public InvoiceRepository(NeoPayContext context)
           : base(context)
        {

        }
    }
}
