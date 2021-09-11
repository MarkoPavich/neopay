

namespace NeoPay.Service.Interfaces
{
    public interface IUserRegistrationModel
    {
        public string Username { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
    }
}
