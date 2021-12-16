using NeoPay.Data.Enums;
using System;

namespace NeoPay.Data.Entities
{
    public record Payer : ContactInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime InvoiceDate { get; set; }
        public PaymentTerms DueDate { get; set; }
        public string Description { get; set; }
    }
}
