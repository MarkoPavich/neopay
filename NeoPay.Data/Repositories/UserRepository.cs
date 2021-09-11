using NeoPay.Data.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NeoPay.Data.Repositories
{
    public class UserRepository: Repository<User>, IUserRepository
    {
        public UserRepository(NeoPayContext context)
            :base(context)
        {
        }

        public async Task<User> GetById(Guid id)
        {
            return await base.GetAll().Where(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task AddUserAsync(User user)
        {
            await base.AddAsync(user);
            await base.SaveChanges();
        }
    }
}
