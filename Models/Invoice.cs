using System.Collections.Generic;

namespace NeoPay.Models
{

    public record Invoice
    {
        public string Id { get; init; }
        public Contact BillFrom { get; init; }
        public Payer BillTo { get; init; }
        public IEnumerable<InvoiceItem> Items { get; init; }
    }

    public class Payer
    {
        public string Name { get; set; }
        public Contact Contact { get; set; }
        public string InvoiceDate { get; set; }  // TODO - datetime dates
        public string PaymentDue { get; set; }
    }

    public class Contact
    {
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Country { get; set; }
        public string Email { get; set; } = string.Empty;
    }

    public class InvoiceItem
    {
        public string Name { get; set; }
        public float Quantity { get; set; }
        public float Price { get; set; }
    }
}
