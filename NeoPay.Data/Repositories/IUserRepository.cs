using NeoPay.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public interface IUserRepository: IRepository<User>
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetById(Guid id);
    }
}
