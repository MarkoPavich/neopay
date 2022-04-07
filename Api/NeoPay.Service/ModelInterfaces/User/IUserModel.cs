using System;

namespace NeoPay.Service.ModelInterfaces.User
{
    public interface IUserModel
    {
        Guid Id { get; init; }
        public string Username { get; init; }
        public string Email { get; init; }
    }
}
