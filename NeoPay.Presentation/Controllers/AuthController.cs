using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using NeoPay.Service.UserServices;
using System;
using System.Threading.Tasks;

namespace NeoPay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var users = await _userService.GetAll();
            return Ok(users);
        }

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
