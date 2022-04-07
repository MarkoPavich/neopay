using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeoPay.Data.Entities
{
    public abstract record ContactInfo
    {
        public string StreetAddress { get; init; }
        public string City { get; init; }
        public string PostCode { get; init; }
        public string Country { get; init; }
        public string Email { get; init; }
    }
}
