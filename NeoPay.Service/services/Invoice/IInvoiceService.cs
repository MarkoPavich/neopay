using NeoPay.Data.Entities;
using NeoPay.Data.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeoPay.Service.services
{
    public interface IInvoiceService
    {
        Task<Invoice> GetByIdAsync(string Id);
        Task<IEnumerable<Invoice>> GetAllAsync();
        Task AddAsync(Invoice invoice);
        Task DeleteAsync(string Id);
        Task UpdateInvoiceStatusAsync(string Id, InvoiceStatus status);
        Task UpdateInvoiceAsync(Invoice invoice);
    }
}
