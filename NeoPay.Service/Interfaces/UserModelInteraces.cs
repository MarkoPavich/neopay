

using System;

namespace NeoPay.Service.Interfaces
{
    public interface IUserRegistrationModel
    {
        public string Username { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
    }

    public interface IUserModel
    {
        Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
