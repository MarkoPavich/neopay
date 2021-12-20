
using Microsoft.EntityFrameworkCore;
using NeoPay.Data.Entities;
using NeoPay.Data.Enums;
using NeoPay.Data.Models;
using System.Collections.Generic;
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

        public override IQueryable<Invoice> GetAll()
        {
            return base.GetAll()
                .Include(s => s.BillFrom)
                .Include(s => s.BillTo)
                .Include(s => s.Items);
        }

        public async Task<Invoice> AddAsync(Invoice invoice)
        {
            base.Add(invoice);
            await SaveChanges();
            return invoice;
        }

        public async Task<IEnumerable<Invoice>> GetAllAsync(string userId)
        {
            return await GetAll().Where(a => a.UserId == userId).ToListAsync();
        }

        public async Task<Invoice> GetByIdAsync(string invoiceId)
        {
            return await GetAll().Where(a => a.Id == invoiceId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Invoice>> GetFiltered(string userId, InvoiceFilters filters)
        {
            return await GetAll()
                .Where(
                    a => a.UserId == userId 
                    && filters.AllowedStatuses.Contains(a.Status)
                    )
                .ToListAsync();
        }

        public async Task<IEnumerable<InvoiceStatus>> GetAvailableStatuses(string userId)
        {
            return await GetAll()
                .Where(a => a.UserId == userId)
                .Select(a => a.Status)
                .Distinct().ToListAsync();
        }
    }
}
