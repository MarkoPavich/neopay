using NeoPay.Models;
using System.Collections.Generic;

namespace NeoPay.Dtos
{
    public class InvoiceDto
    {
        public string Id { get; set; }
        public Contact BillFrom { get; set; }
        public PayerDto BillTo { get; set; }
        public IEnumerable<InvoiceItem> Items { get; set; }
    }

    public class PayerDto
    {
        public string ClientName { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Country { get; set; }
        public string ClientEmail { get; set; } = string.Empty;
        public string InvoiceDate { get; set; }  // TODO - datetime dates
        public string DueDate { get; set; }
    }
}
