

using NeoPay.Data.Repositories.Invoice;

namespace NeoPay.Service.services
{
    public class InvoiceService : IInvoiceService
    {
        protected readonly IInvoiceRepository _repository;

        public InvoiceService(IInvoiceRepository repository)
        {
            _repository = repository;
        }
    }
}
