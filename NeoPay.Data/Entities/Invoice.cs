using System.Collections.Generic;

namespace NeoPay.Data.Entities
{
    public record Invoice 
    {
        public string Id { get; init; }
        public virtual string UserId { get; init; }
        public Contact BillFrom { get; init; }
        public Payer BillTo { get; init; }
        public virtual NeoPayUser User { get; init; }
        public IEnumerable<InvoiceItem> Items { get; init; }
    }
}
