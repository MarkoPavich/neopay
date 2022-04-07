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
        private readonly RsaSecurityKey _securityKey;

        public TokenService(IConfiguration configuration, ITokenRepository tokenRepository, RsaSecurityKey securityKey)
        {
            _configuration = configuration;
            _repository = tokenRepository;
            _securityKey = securityKey;
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
            var audience = _configuration["Jwt:Audience"];
            var expires = DateTime.UtcNow.AddMinutes(Int16.Parse(_configuration["Jwt:DurationMinutes"]));

            var credentials = new SigningCredentials(_securityKey, SecurityAlgorithms.RsaSha256);

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

        public async Task<RefreshToken> GetRefreshTokenByValue(string token)
        {
            return await _repository.GetByTokenAsync(token);
        }

        public async Task MarkAsUsed(RefreshToken refreshToken)
        {
            refreshToken.IsUsed = true;
            await _repository.SaveChanges();
        }

        public async Task InvalidateRefreshTokenFamily(RefreshToken refreshToken)
        {
            await _repository.InvalidateRefreshTokenFamily(refreshToken.UserId);
        }
    }
}
