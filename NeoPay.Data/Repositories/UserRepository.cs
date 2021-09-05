using NeoPay.Data.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace NeoPay.Data.Repositories
{
    public class UserRepository: Repository<User>, IUserRepository
    {
        public UserRepository(NeoPayContext context)
            :base(context)
        {
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await base.GetAll().ToListAsync();
        }

        public async Task<User> GetById(Guid id)
        {
            return await base.GetAll().Where(a => a.Id == id).FirstOrDefaultAsync();
        }
    }
}
