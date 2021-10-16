using System.Linq;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public interface IRepository<TEntity> where TEntity : class,  new()
    {
        IQueryable<TEntity> GetAll();
        Task<TEntity> AddAsync(TEntity entity);
        TEntity Update(TEntity entity);
        TEntity Remove(TEntity entity);
        Task SaveChanges();
    }
}
