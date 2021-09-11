using NeoPay.Data.Models;
using NeoPay.Service.Interfaces;
using System;
using System.Threading.Tasks;

namespace NeoPay.Service.UserServices
{
    public interface IUserService
    {
        Task<User> GetUserById(Guid Id);
        Task RegisterUserAsync(IUserRegistrationModel userData);
    }
}
