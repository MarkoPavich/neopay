using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NeoPay.Data.Entities;
using NeoPay.Dtos;
using NeoPay.Presentation.Constants;
using NeoPay.Presentation.Extensions;
using NeoPay.Service.Services.Auth;
using System;
using System.Collections.Generic;
using System.Globalization;
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
                return Unauthorized(new ErrorResponse
                {
                    error_type = "Unauthorized",
                    error_message = "Invalid username and/or password"
                });
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (signInResult.Succeeded)
            {

                return Ok(await CreateAuthResponse(user));
            }

            return Unauthorized(new ErrorResponse
            {
                error_type = "Unauthorized",
                error_message = "Invalid username and/or password"
            }); ;
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

        [HttpPost("refresh")]
        public async Task<ActionResult<AuthenticateResponse>> Refresh([FromForm]string refreshToken)
        {
            var clientIpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            var token = await _tokenService.GetRefreshTokenByValue(refreshToken);

            if(token == null || token.ExpiresAtUtc < DateTime.UtcNow || token.IsRevoked)
            {
                return Unauthorized(new
                {
                    error = ErrorTypeStrings.InvalidRequest,
                    error_description = "Invalid or expired refresh token"
                });
            }

            if(token.ClientIpAddress != clientIpAddress)
            {
                return Unauthorized(new
                {
                    error = ErrorTypeStrings.UnauthorizedClient,
                    error_description = "Unrecognised client address"
                });
            }

            if (token.IsUsed)
            {
                // Possibly malicious access attempt
                await _tokenService.InvalidateRefreshTokenFamily(token);

                return Unauthorized(new
                {
                    error = ErrorTypeStrings.InvalidRequest,
                    error_description = "Invalid or expired refresh token"
                });
            }

            var user = await _userManager.FindByIdAsync(token.UserId);

            var response = await CreateAuthResponse(user);
            await _tokenService.MarkAsUsed(token);

            return Ok(response);
        }

        private async Task<AuthenticateResponse> CreateAuthResponse(NeoPayUser user)
        {
            var userDto = user.ToDto();

            var tokenDescriptor = _tokenService.GenerateToken(userDto);
            var refreshToken = await _tokenService.GenerateRefreshTokenAsync(user.Id, tokenDescriptor.ValidTo);

            var response = new AuthenticateResponse()
            {
                User = userDto,
                Token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor),
                RefreshToken = refreshToken.Token,
                ValidTo = tokenDescriptor.ValidTo.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffK", CultureInfo.InvariantCulture),
            };

            return response;
        }
    }
}
