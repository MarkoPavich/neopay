using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using NeoPay.Models;
using NeoPay.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NeoPay.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoicesRepository repository; // TODO - use DI instead of explicit dependency

        public InvoiceController(IInvoicesRepository repository)
        {
            this.repository = repository;
        }

       
        public ActionResult<IEnumerable<InvoiceDto>> Get()
        {
            IEnumerable<InvoiceDto> invoices = repository.GetAll().Select(inv => inv.ToDto());
            return Ok(invoices);
        }

        [HttpGet("{id}")]
        public ActionResult<InvoiceDto> Get(string Id)
        {
            Invoice invoice = repository.GetById(Id);
            if(invoice == null)
            {
                return NotFound();
            }

            return Ok(invoice.ToDto());
        }

        [HttpPost]
        public IActionResult Post(InvoiceDto invoiceDto)
        {
            // TODO - rework this
            try
            {
                invoiceDto.GenerateId();
                Invoice invoice = invoiceDto.FromDto();

                repository.StoreNew(invoice);

                return Ok(invoice);
            }

            catch(Exception ex)
            {
                return BadRequest(ex); 
            }

        }
    }
}
