using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using System;

namespace NeoPay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        public ActionResult<AuthenticateResponse> Register(RegisterRequest request)
        {
            // Placeholder
            var response = new AuthenticateResponse
            {
                Id = Guid.NewGuid(),
                Token = request.Password,
                Username = request.Username
            };

            return Ok(response);
        }
    }
}
