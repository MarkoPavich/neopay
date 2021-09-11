using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using NeoPay.Models;
using NeoPay.Presentation.Extensions;
using NeoPay.Service.Interfaces;
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
        private readonly ITokenService _tokenService;

        public AuthController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticateResponse>> Register(RegisterRequest request)
        {
            await _userService.RegisterUserAsync(request);
            return Ok();
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginRequest userLogin)
        {
            // testTemplate
            User user = new()
            { 
                Id = Guid.NewGuid(),
                Username = userLogin.Username,
                Email = "someMail@mail.com",
                PasswordHash = "ibbghgbks"
            };

            var response = new AuthenticateResponse()
            {
                User = user.ToDto(),
                Token = _tokenService.GenerateToken(user)
            };

            return Ok(response);
        }
    }
}
