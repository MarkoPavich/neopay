using NeoPay.Models;
using System.Collections.Generic;

namespace NeoPay.Dtos
{
    public class InvoiceDto
    {
        public string Id { get; set; }
        public Contact BillFrom { get; set; }
        public Payer BillTo { get; set; }
        public IEnumerable<InvoiceItem> Items { get; set; }
    }
}
