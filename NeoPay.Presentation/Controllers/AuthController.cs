using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NeoPay.Dtos;
using NeoPay.Presentation.Extensions;
using NeoPay.Service.Services.Auth;
using System;
using System.Collections.Generic;
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
        private readonly IConfiguration _configuration;

        public AuthController(
            ITokenService tokenService, 
            UserManager<IdentityUser> userManager, 
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration
            )
        {

            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;

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

                return Ok(CreateAuthResponse(user));
            }

            foreach(var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);

            if(user == null)
            {
                return Unauthorized("Invalid username and/or password");
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (signInResult.Succeeded)
            {

                return Ok(CreateAuthResponse(user));
            }

            return Unauthorized("Invalid username and/or password");
        }

        [HttpPost("google-signin")]
        public async Task<ActionResult> GoogleSignIn(GoogleSignInCredentials data)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new();
            settings.Audience = new List<string>() { _configuration["Authentication:Google:ClientId"] };

            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(data.IdToken, settings).Result;
            var user = await _userManager.FindByEmailAsync(payload.Email);

            if(user == null)
            {
                user = new IdentityUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = payload.Email,
                    Email = payload.Email

                };

                var result = await _userManager.CreateAsync(user);

                if (!result.Succeeded)
                {
                    throw new Exception("Something went wrong");
                }
            }

            return Ok(CreateAuthResponse(user));
        }

        private AuthenticateResponse CreateAuthResponse(IdentityUser user)
        {
            var userDto = user.ToDto();

            var tokenDescriptor = _tokenService.GenerateToken(userDto);
            var response = new AuthenticateResponse()
            {
                User = userDto,
                Token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor),
                ValidTo = tokenDescriptor.ValidTo
            };

            return response;
        }
    }
}
