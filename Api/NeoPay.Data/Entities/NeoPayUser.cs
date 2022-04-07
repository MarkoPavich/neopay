using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace NeoPay.Data.Entities
{
    public class NeoPayUser : IdentityUser
    {
        public Guid UserId { get; set; }
        public virtual IEnumerable<Invoice> Invoices { get; set; }
    }
}
