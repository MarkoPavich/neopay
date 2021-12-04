using NeoPay.Data.Entities;
using NeoPay.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public interface IInvoiceRepository
    {
        Task SaveChanges();
        Task<Invoice> GetByIdAsync(string invoiceId);
        Task<IEnumerable<Invoice>> GetAllAsync(string userId);
        Task<IEnumerable<Invoice>> GetFiltered(string userId, InvoiceFilters filters);
        Task<Invoice> AddAsync(Invoice invoice);
        void Remove(Invoice invoice);  
    }
}
