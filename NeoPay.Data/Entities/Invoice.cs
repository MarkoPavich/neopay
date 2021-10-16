using System.Collections.Generic;

namespace NeoPay.Data.Entities
{
    public record Invoice 
    {
        public string Id { get; init; }
        public virtual Contact BillFrom { get; init; }
        public virtual Payer BillTo { get; init; }
        public virtual NeoPayUser User { get; init; }
        public virtual IEnumerable<InvoiceItem> Items { get; init; }
    }
}
