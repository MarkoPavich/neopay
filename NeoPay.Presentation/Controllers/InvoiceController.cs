using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using NeoPay.Models;
using NeoPay.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using NeoPay.Presentation.Extensions;

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

        [HttpGet]
        public ActionResult<IEnumerable<InvoiceDto>> Get()
        {
            IEnumerable<InvoiceDto> invoices = repository.GetAll().Select(inv => inv.ToDto());
            return Ok(invoices);
        }

        [HttpGet("{id}")]
        public ActionResult<InvoiceDto> Get(string Id)
        {
            try
            {
                Invoice invoice = repository.GetById(Id);
                if (invoice == null)
                {
                    return NotFound();
                }

                return Ok(invoice.ToDto());
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }

        }

        [HttpPost]
        public ActionResult<InvoiceDto> Post(InvoiceDto invoiceDto)
        {
            // TODO - rework this
            try
            {
                invoiceDto.GenerateId();
                Invoice invoice = invoiceDto.FromDto();

                repository.StoreNew(invoice);

                return Ok(invoice.ToDto());
            }

            catch(Exception)
            {
                return StatusCode(500, "Something went wrong"); 
            }

        }

        [HttpPut("{id}")]
        public ActionResult<InvoiceDto> Put(string Id, InvoiceDto invoiceDto)
        {
            try
            {
                Invoice invoice = repository.GetById(Id);
                if(invoice == null)
                {
                    return NotFound();
                }

                if(invoice.Id != invoiceDto.Id)
                {
                    return BadRequest();
                }

                repository.Update(invoiceDto.FromDto());

                return Ok(invoiceDto);
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string Id)
        {
            try
            {
                Invoice invoice = repository.GetById(Id);

                if (invoice == null)
                {
                    return NotFound();
                }

                repository.Delete(Id);

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }

        }
    }
}