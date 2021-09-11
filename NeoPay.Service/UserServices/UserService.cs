using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using NeoPay.Data.Models;
using NeoPay.Data.Repositories;

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

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userRepository.GetAllAsync();
        }
    }
}
