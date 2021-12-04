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
using NeoPay.Data.Enums;

namespace NeoPay.Controllers
{

    [Authorize]
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

        [HttpPut]
        public async Task <ActionResult<InvoiceDto>> Put(InvoiceDto invoiceDto)
        {
            try
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                Invoice invoice = await _service.GetByIdAsync(invoiceDto.Id);

                if(invoice == null)
                {
                    return NotFound();
                }

                if(invoice.UserId != userId || invoice.Status != InvoiceStatus.Draft)
                {
                    return BadRequest();
                }

                await _service.UpdateInvoiceAsync(invoiceDto.FromDto(userId));

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

                await _service.DeleteAsync(Id);

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong");
            }

        }

        [HttpGet("setStatusPaid/{id}")]
        public async Task <ActionResult> SetStatusPaid(string Id)
        {
            try
            {
                await _service.UpdateInvoiceStatusAsync(Id, InvoiceStatus.Paid);
                return Ok();
            }
            catch (Exception exception)
            {
                if(exception is InvalidOperationException)
                {
                    return BadRequest();
                }

                return StatusCode(500, "Something went wrong");
            }
        }
    }
}