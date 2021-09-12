using System;

namespace NeoPay.Service.ModelInterfaces.User
{
    public interface IUserModel
    {
        Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
