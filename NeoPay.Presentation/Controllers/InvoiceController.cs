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
using System.Security.Claims;

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
            IEnumerable<Invoice> invoices = await _service.GetAllAsync();
            return Ok(invoices.Select(inv => inv.ToDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDto>> Get(string Id)
        {
            try
            {
                Invoice invoice = await _service.GetByIdAsync(Id);
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
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task <ActionResult<InvoiceDto>> Post(InvoiceDto invoiceDto)
        {
            try
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                invoiceDto.GenerateId();
                Invoice invoice = invoiceDto.FromDto(userId);

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
                Invoice invoice = await _service.GetByIdAsync(Id);
                if(invoice == null)
                {
                    return NotFound();
                }

                if(invoice.Id != invoiceDto.Id)
                {
                    return BadRequest();
                }

                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                await _service.Update(invoiceDto.FromDto(userId));

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
                Invoice invoice = await _service.GetByIdAsync(Id);

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