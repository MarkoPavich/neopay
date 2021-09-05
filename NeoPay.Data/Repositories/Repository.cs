using NeoPay.Data.Models;
using System.Linq;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, new()
    {
        protected readonly NeoPayContext Context;

        public Repository(NeoPayContext context)
        {
            Context = context;
        }

        public IQueryable<TEntity> GetAll()
        {
            return Context.Set<TEntity>();
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await Context.AddAsync(entity);
            return entity;
        }

        public TEntity Update(TEntity entity)
        {
            Context.Update(entity);
            return entity;
        }

        public TEntity Remove(TEntity entity)
        {
            Context.Remove(entity);
            return entity;
        }

        public async Task SaveChanges()
        {
            await Context.SaveChangesAsync();
        }
    }
}
