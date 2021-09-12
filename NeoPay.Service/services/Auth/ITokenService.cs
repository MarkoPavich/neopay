using NeoPay.Service.ModelInterfaces.User;
using System.IdentityModel.Tokens.Jwt;

namespace NeoPay.Service.Services.Auth
{
    public interface ITokenService
    {
        JwtSecurityToken GenerateToken(IUserModel user);
    }
}
