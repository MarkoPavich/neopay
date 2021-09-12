using NeoPay.Service.ModelInterfaces.User;


namespace NeoPay.Service.Services.Auth
{
    public interface ITokenService
    {
        string GenerateToken(IUserModel user);
    }
}
