using System;
using System.Threading.Tasks;
using NeoPay.Data.Models;
using NeoPay.Data.Repositories;
using NeoPay.Service.Interfaces;

namespace NeoPay.Service.UserServices
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task RegisterUserAsync(IUserRegistrationModel userData)
        {
            User user = new()
            {
                Id = Guid.NewGuid(),
                Username = userData.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userData.Password),
                Email = userData.Email
            };

            await _userRepository.AddUserAsync(user);
        }
    }
}
