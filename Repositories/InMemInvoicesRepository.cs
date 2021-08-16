using NeoPay.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NeoPay.Repositories
{
    public class InMemInvoicesRepository : IInvoicesRepository
    {
        private readonly List<Invoice> Invoices = new(){};

        public IEnumerable<Invoice> GetAll()
        {
            return Invoices;
        }

        public Invoice GetById(string Id)
        {
            return Invoices.Where(a => a.Id == Id).SingleOrDefault();
        }

        public void StoreNew(Invoice invoice)
        {
            Invoices.Add(invoice);
        }
    }
}
