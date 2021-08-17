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
                BillTo = new PayerDto()
                {
                    ClientName = invoice.BillTo.Name,
                    City = invoice.BillTo.Contact.City,
                    Country = invoice.BillTo.Contact.Country,
                    ClientEmail = invoice.BillTo.Contact.Email,
                    InvoiceDate = invoice.BillTo.InvoiceDate,
                    DueDate = invoice.BillTo.DueDate,
                    Description = invoice.BillTo.Description,
                    StreetAddress = invoice.BillTo.Contact.StreetAddress,
                    PostCode = invoice.BillTo.Contact.PostCode
                },
                Items = invoice.Items
            };
        }

        public static Invoice FromDto(this InvoiceDto invoice)
        {

            return new Invoice()
            {
                Id = invoice.Id,
                BillFrom = invoice.BillFrom,
                BillTo = new Payer()
                {
                    Name = invoice.BillTo.ClientName,
                    InvoiceDate = invoice.BillTo.InvoiceDate,
                    DueDate = invoice.BillTo.DueDate,
                    Description = invoice.BillTo.Description,
                    Contact = new Contact()
                    {
                        City = invoice.BillTo.City,
                        Country = invoice.BillTo.Country,
                        Email = invoice.BillTo.ClientEmail,
                        PostCode = invoice.BillTo.PostCode,
                        StreetAddress = invoice.BillTo.StreetAddress
                    }
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
