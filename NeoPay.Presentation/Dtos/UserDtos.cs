using NeoPay.Service.ModelInterfaces.User;
using System;

namespace NeoPay.Presentation.Dtos
{
    public record UserDto : IUserModel
    {
        public Guid Id { get; init; }
        public string Username { get; init; }
        public string Email { get; init; }
    }
}
