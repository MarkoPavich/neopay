using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NeoPay.Data.Entities;
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
        private readonly UserManager<NeoPayUser> _userManager;
        private readonly SignInManager<NeoPayUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthController(
            ITokenService tokenService, 
            UserManager<NeoPayUser> userManager, 
            SignInManager<NeoPayUser> signInManager,
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
            var user = new NeoPayUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = request.Username,
                Email = request.Email
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {

                return Ok(await CreateAuthResponse(user));
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

                return Ok(await CreateAuthResponse(user));
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
                user = new NeoPayUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = payload.Email,
                    Email = payload.Email

                };

                await _userManager.CreateAsync(user);
            }

            return Ok(await CreateAuthResponse(user));
        }

        private async Task<AuthenticateResponse> CreateAuthResponse(NeoPayUser user)
        {
            var userDto = user.ToDto();
            var clientIpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            var tokenDescriptor = _tokenService.GenerateToken(userDto);
            var refreshToken = await _tokenService.GenerateRefreshTokenAsync(user.Id, tokenDescriptor.ValidTo, clientIpAddress);

            var response = new AuthenticateResponse()
            {
                User = userDto,
                Token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor),
                RefreshToken = refreshToken.Token,
                ValidTo = tokenDescriptor.ValidTo
            };

            return response;
        }
    }
}
