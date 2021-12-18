using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NeoPay.Data.Entities;
using NeoPay.Data.Repositories;
using NeoPay.Service.ModelInterfaces.User;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NeoPay.Service.Services.Auth
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly ITokenRepository _repository;

        public TokenService(IConfiguration configuration, ITokenRepository tokenRepository)
        {
            _configuration = configuration;
            _repository = tokenRepository;
        }

        public JwtSecurityToken GenerateToken(IUserModel user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var issuer = _configuration["Jwt:Issuer"];
            var key = _configuration["Jwt:Key"];
            var audience = _configuration["Jwt:Audience"];
            var expires = DateTime.Now.AddMinutes(Int16.Parse(_configuration["Jwt:DurationMinutes"]));

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new JwtSecurityToken(issuer, audience, claims, expires: expires, signingCredentials: credentials);

            return tokenDescriptor;
        }

        public async Task<RefreshToken> GenerateRefreshTokenAsync(string userId, DateTime expires, string clientIp)
        {
            RefreshToken refreshToken = new()
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                ClientIpAddress = clientIp,
                CreatedAtUtc = DateTime.UtcNow,
                ExpiresAtUtc = expires,
                IsUsed = false,
                IsRevoked = false,
                Token = Guid.NewGuid().ToString(),
            };

            await _repository.AddAsync(refreshToken);
            return refreshToken;
        }
    }
}
