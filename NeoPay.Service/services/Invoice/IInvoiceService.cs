using NeoPay.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeoPay.Service.services
{
    public interface IInvoiceService
    {
        Task<Invoice> GetById(string Id);
        Task<IEnumerable<Invoice>> GetAll();
        Task AddAsync(Invoice invoice);
        Task Update(Invoice invoice);
        Task Delete(string Id);
    }
}
