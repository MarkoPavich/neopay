using Microsoft.AspNetCore.Identity;
using NeoPay.Presentation.Dtos;

namespace NeoPay.Presentation.Extensions
{
    public static class UserExtensions
    {
        public static UserDto ToDto(this IdentityUser user)
        {
            return new UserDto()
            {
                Id = System.Guid.Parse(user.Id),
                Username = user.UserName,
                Email = user.Email
            };
        }
    }
}
