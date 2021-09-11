

namespace NeoPay.Service.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(IUserModel user);
    }
}
