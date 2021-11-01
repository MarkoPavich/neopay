﻿

using NeoPay.Data.Entities;
using NeoPay.Data.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace NeoPay.Service.services
{
    public class InvoiceService : IInvoiceService
    {
        protected readonly IInvoiceRepository _repository;
        protected readonly string _userId;

        public InvoiceService(IInvoiceRepository repository, IHttpContextAccessor contextAccessor)
        {
            _repository = repository;
            _userId = contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        public Task AddAsync(Invoice invoice)
        {
            return _repository.AddAsync(invoice);
        }

        public async Task DeleteAsync(string invoiceId)
        {
            var invoice = await _repository.GetByIdAsync(invoiceId);

            _repository.Remove(invoice);
            await _repository.Complete();

        }

        public async Task<IEnumerable<Invoice>> GetAllAsync()
        {

            IEnumerable<Invoice> invoices = _repository.GetAll()
                .Include(s => s.BillFrom)
                .Include(s => s.BillTo)
                .Include(s => s.Items)
                .Where(a => a.UserId == _userId).ToList();
            await _repository.Complete();

            return invoices;
        }

        public async Task<Invoice> GetByIdAsync(string invoiceId)
        {
            Invoice invoice = await _repository.GetByIdAsync(invoiceId);
            return invoice;
        }

        public Task SaveChangesAsync()
        {
            return _repository.SaveChanges();
        }
    }
}
