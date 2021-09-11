using System.ComponentModel.DataAnnotations;
using NeoPay.Presentation.Dtos;
using NeoPay.Service.Interfaces;

namespace NeoPay.Dtos
{
    public record LoginRequest
    {
        [Required]
        public string Username { get; init; }
        [Required]
        public string Password { get; init; }
    }

    public record AuthenticateResponse
    {
        public UserDto User { get; init; }
        public string Token { get; init; }
    }

    public record RegisterRequest : IUserRegistrationModel
    {
        [Required]
        public string Username { get; init; }
        [Required]
        public string Email { get; init; }
        [Required]
        public string Password { get; init; }
    }
}