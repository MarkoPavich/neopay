using NeoPay.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeoPay.Service.services
{
    public interface IInvoiceService
    {
        Task<Invoice> GetByIdAsync(string Id);
        Task<IEnumerable<Invoice>> GetAllAsync();
        Task AddAsync(Invoice invoice);
        Task Update(Invoice invoice);
        Task Delete(string Id);
    }
}
