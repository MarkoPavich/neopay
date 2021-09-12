using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using NeoPay.Models;
using NeoPay.Presentation.Extensions;
using NeoPay.Service.Interfaces;
using System;
using System.Threading.Tasks;

namespace NeoPay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthController(
            ITokenService tokenService, 
            UserManager<IdentityUser> userManager, 
            SignInManager<IdentityUser> signInManager
            )
        {

            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticateResponse>> Register(RegisterRequest request)
        {
            var identityUser = new IdentityUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = request.Username,
                Email = request.Email
            };

            var result = await _userManager.CreateAsync(identityUser, request.Password);

            if (result.Succeeded)
            {
                var user = new User()
                {
                    Id = Guid.Parse(identityUser.Id),
                    Username = identityUser.UserName,
                    Email = identityUser.Email
                };

                var token = _tokenService.GenerateToken(user);
                var response = new AuthenticateResponse()
                {
                    User = user.ToDto(),
                    Token = token
                };

                return Ok(response);
            }

            foreach(var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return BadRequest(ModelState);
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
