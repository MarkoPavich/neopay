

namespace NeoPay.Service.ModelInterfaces.User
{
    public interface IUserRegistrationModel
    {
        public string Username { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
    }
}
