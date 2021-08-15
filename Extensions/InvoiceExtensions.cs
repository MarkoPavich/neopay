using NeoPay.Dtos;
using NeoPay.Models;
using System;
using System.Linq;

namespace NeoPay
{
    public static class InvoiceExtensions
    {
        private static readonly Random random = new();

        public static InvoiceDto ToDto(this Invoice invoice)
        {
            return new InvoiceDto()
            {
                Id = invoice.Id,
                BillFrom = invoice.BillFrom,
                BillTo = invoice.BillTo,
                Items = invoice.Items
            };
        }

        public static void GenerateId(this InvoiceDto invoice)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  // TODO - rework this maybe
            string id = new(Enumerable.Repeat(chars, 5).Select(s => s[random.Next(s.Length)]).ToArray());

            invoice.Id = id;
        }
    }
}
