
using NeoPay.Service.ModelInterfaces.User;
using System;

namespace NeoPay.Models
{
    public class User : IUserModel
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
