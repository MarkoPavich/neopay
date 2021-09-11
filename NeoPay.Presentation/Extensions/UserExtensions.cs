using NeoPay.Models;
using NeoPay.Presentation.Dtos;

namespace NeoPay.Presentation.Extensions
{
    public static class UserExtensions
    {
        public static UserDto ToDto(this User user)
        {
            return new UserDto()
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            };
        }
    }
}
