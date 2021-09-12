using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using NeoPay.Models;
using NeoPay.Presentation.Extensions;
using NeoPay.Service.Services.Auth;
using System;
using System.IdentityModel.Tokens.Jwt;
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
            var user = new IdentityUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = request.Username,
                Email = request.Email
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                var userDto = user.ToDto();

                var tokenDescriptor = _tokenService.GenerateToken(userDto);
                var response = new AuthenticateResponse()
                {
                    User = userDto,
                    Token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor),
                    ValidTo = tokenDescriptor.ValidTo
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

            return Ok();
        }
    }
}
