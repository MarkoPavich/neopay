﻿using NeoPay.Enums;
using NeoPay.Models;
using System.Collections.Generic;

namespace NeoPay.Dtos
{
    public record InvoiceDto
    {
        public string Id { get; set; }
        public Contact BillFrom { get; init; }
        public PayerDto BillTo { get; init; }
        public IEnumerable<InvoiceItem> Items { get; init; }
    }

    public record PayerDto
    {
        public string ClientName { get; init; }
        public string StreetAddress { get; init; }
        public string City { get; init; }
        public string PostCode { get; init; }
        public string Country { get; init; }
        public string ClientEmail { get; init; } = string.Empty;
        public string InvoiceDate { get; init; }  // TODO - datetime dates
        public PaymentTerms DueDate { get; init; }
        public string Description { get; init; }
    }
}