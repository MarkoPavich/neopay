using NeoPay.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NeoPay.Repositories
{
    public class InMemInvoicesRepository : IInvoicesRepository
    {
        private List<Invoice> Invoices = new(){};

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

        public void Update(Invoice invoice)
        {
            List<Invoice> invoices = new();

            Invoices.ForEach(inv =>
            {
                if(inv.Id == invoice.Id)
                {
                    invoices.Add(invoice);
                }
                else
                {
                    invoices.Add(inv);
                }
            });

            Invoices = invoices;
        }

        public void Delete(string Id)
        {
            Invoices = Invoices.Where(x => x.Id != Id).ToList();
        }
    }
}
