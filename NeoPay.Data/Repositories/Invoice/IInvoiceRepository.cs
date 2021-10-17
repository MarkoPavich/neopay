using NeoPay.Data.Entities;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public interface IInvoiceRepository : IRepository<Invoice>
    {
        Task Complete();
        Task<Invoice> GetByIdAsync(string invoiceId);
    }
}
