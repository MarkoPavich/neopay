using NeoPay.Models;
using System;
using System.Collections.Generic;

namespace NeoPay.Repositories
{
    public interface IInvoicesRepository
    {
        IEnumerable<Invoice> GetAll();
        Invoice GetById(string Id);
        void StoreNew(Invoice invoice);
        void Update(Invoice invoice);
        void Delete(string Id);
    }
}