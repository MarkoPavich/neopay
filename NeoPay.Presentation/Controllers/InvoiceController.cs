using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using NeoPay.Presentation.Extensions;
using Microsoft.AspNetCore.Authorization;
using NeoPay.Data.Entities;
using NeoPay.Service.services;
using System.Threading.Tasks;

namespace NeoPay.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _service;

        public InvoiceController(IInvoiceService repository)
        {
            _service = repository;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<InvoiceDto>>> Get()
        {
            IEnumerable<Invoice> invoices = await _service.GetAll();
            return Ok(invoices.Select(inv => inv.ToDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDto>> Get(string Id)
        {
            try
            {
                Invoice invoice = await _service.GetById(Id);
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
        public async Task <ActionResult<InvoiceDto>> Post(InvoiceDto invoiceDto)
        {
            // TODO - rework this
            try
            {
                invoiceDto.GenerateId();
                Invoice invoice = invoiceDto.FromDto();

                await _service.AddAsync(invoice);

                return Ok(invoice.ToDto());
            }

            catch(Exception)
            {
                return StatusCode(500, "Something went wrong"); 
            }

        }

        [HttpPut("{id}")]
        public async Task <ActionResult<InvoiceDto>> Put(string Id, InvoiceDto invoiceDto)
        {
            try
            {
                Invoice invoice = await _service.GetById(Id);
                if(invoice == null)
                {
                    return NotFound();
                }

                if(invoice.Id != invoiceDto.Id)
                {
                    return BadRequest();
                }

                await _service.Update(invoiceDto.FromDto());

                return Ok(invoiceDto);
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpDelete("{id}")]
        public async Task <ActionResult> Delete(string Id)
        {
            try
            {
                Invoice invoice = await _service.GetById(Id);

                if (invoice == null)
                {
                    return NotFound();
                }

                await _service.Delete(Id);

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }

        }
    }
}