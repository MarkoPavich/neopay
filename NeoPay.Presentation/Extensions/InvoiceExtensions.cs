using NeoPay.Data.Entities;
using NeoPay.Dtos;
using System;
using System.Globalization;
using System.Linq;

namespace NeoPay.Presentation.Extensions
{
    public static class InvoiceExtensions
    {
        private static readonly Random random = new();

        public static InvoiceDto ToDto(this Invoice invoice)
        {
            return new InvoiceDto()
            {
                Id = invoice.Id,
                Status = invoice.Status,
                BillFrom = invoice.BillFrom,
                BillTo = new PayerDto()
                {
                    ClientName = invoice.BillTo.Name,
                    City = invoice.BillTo.City,
                    Country = invoice.BillTo.Country,
                    ClientEmail = invoice.BillTo.Email,
                    InvoiceDate = invoice.BillTo.InvoiceDate.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
                    DueDate = invoice.BillTo.DueDate,
                    Description = invoice.BillTo.Description,
                    StreetAddress = invoice.BillTo.StreetAddress,
                    PostCode = invoice.BillTo.PostCode
                },
                Items = invoice.Items
            };
        }

        public static Invoice ToModel(this InvoiceDto invoice, string userId)
        {
            return new Invoice()
            {
                Id = invoice.Id,
                Status = invoice.Status,
                UserId = userId,
                BillFrom = invoice.BillFrom,
                BillTo = new Payer()
                {
                    Name = invoice.BillTo.ClientName,
                    InvoiceDate = DateTime.ParseExact(invoice.BillTo.InvoiceDate, "MM/dd/yyyy", CultureInfo.InvariantCulture),
                    DueDate = invoice.BillTo.DueDate,
                    Description = invoice.BillTo.Description,
                    City = invoice.BillTo.City,
                    Country = invoice.BillTo.Country,
                    Email = invoice.BillTo.ClientEmail,
                    PostCode = invoice.BillTo.PostCode,
                    StreetAddress = invoice.BillTo.StreetAddress
                },
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
