

using NeoPay.Data.Entities;
using NeoPay.Data.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using NeoPay.Data.Enums;
using System;

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
            await _repository.SaveChanges();

        }

        public async Task<IEnumerable<Invoice>> GetAllAsync()
        {
            return await _repository.GetAllAsync(_userId);
        }

        public async Task<Invoice> GetByIdAsync(string invoiceId)
        {
            Invoice invoice = await _repository.GetByIdAsync(invoiceId);
            return invoice;
        }

        public async Task<IEnumerable<InvoiceStatus>> GetAvailableStatuses()
        {
            return await _repository.GetAvailableStatuses(_userId);
        }

        public async Task UpdateInvoiceAsync(Invoice invoice)
        {
            Invoice record = await _repository.GetByIdAsync(invoice.Id);

            record.BillFrom = invoice.BillFrom;
            record.BillTo = invoice.BillTo;
            record.Status = invoice.Status;
            record.Items = invoice.Items;

            await _repository.SaveChanges();
        } 

        public async Task UpdateInvoiceStatusAsync(string invoiceId, InvoiceStatus status)
        {
            Invoice invoice = await _repository.GetByIdAsync(invoiceId);

            if(invoice.Status == status)
            {
                throw new InvalidOperationException();
            }

            invoice.Status = status;
            await _repository.SaveChanges();
        }
    }
}
