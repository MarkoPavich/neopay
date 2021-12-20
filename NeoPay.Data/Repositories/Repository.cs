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

        public virtual IQueryable<TEntity> GetAll()
        {
            return Context.Set<TEntity>();
        }

        public virtual void Add(TEntity entity)
        {
            Context.Add(entity);
        }

        public virtual TEntity Update(TEntity entity)
        {
            Context.Update(entity);
            return entity;
        }

        public virtual void Remove(TEntity entity)
        {
            Context.Remove(entity);
        }

        public async Task SaveChanges()
        {
            await Context.SaveChangesAsync();
        }
    }
}
