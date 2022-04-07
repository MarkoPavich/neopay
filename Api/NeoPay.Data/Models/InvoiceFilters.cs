using NeoPay.Data.Enums;
using System.Collections.Generic;

namespace NeoPay.Data.Models
{
    public class InvoiceFilters
    {
        public List<InvoiceStatus> AllowedStatuses { get; set; }
    }
}
