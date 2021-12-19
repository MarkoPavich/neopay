using NeoPay.Data.Entities;
using NeoPay.Service.ModelInterfaces.User;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace NeoPay.Service.Services.Auth
{
    public interface ITokenService
    {
        JwtSecurityToken GenerateToken(IUserModel user);
        Task<RefreshToken> GenerateRefreshTokenAsync(string userId, DateTime expires, string clientIp);
        Task<RefreshToken> GetRefreshTokenByValue(string token);
        Task MarkAsUsed(RefreshToken refreshToken);
        Task InvalidateRefreshTokenFamily(RefreshToken refreshToken);
    }
}
