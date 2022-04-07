using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeoPay.Data.Entities
{
    public record RefreshToken
    {
        public Guid Id { get; init; }
        public string UserId { get; init; }
        public string Token { get; init; }
        public string ClientIpAddress { get; init; }
        public DateTime CreatedAtUtc { get; init; }
        public DateTime ExpiresAtUtc { get; init; }
        public bool IsUsed { get; set; }
        public bool IsRevoked { get; set; }
    }
}
