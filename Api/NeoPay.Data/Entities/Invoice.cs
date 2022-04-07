using NeoPay.Data.Enums;
using System.Collections.Generic;

namespace NeoPay.Data.Entities
{
    public record Invoice 
    {
        public string Id { get; init; }
        public virtual string UserId { get; init; }
        public Contact BillFrom { get; set; }
        public Payer BillTo { get; set; }
        public InvoiceStatus Status { get; set; }
        public virtual NeoPayUser User { get; init; }
        public IEnumerable<InvoiceItem> Items { get; set; }
    }
}
