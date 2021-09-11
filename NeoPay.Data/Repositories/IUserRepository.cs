using NeoPay.Data.Models;
using System;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public interface IUserRepository: IRepository<User>
    {
        Task<User> GetById(Guid id);
        Task AddUserAsync(User user);
    }
}
