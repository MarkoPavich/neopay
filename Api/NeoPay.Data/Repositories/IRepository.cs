using System.Linq;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public interface IRepository<TEntity> where TEntity : class,  new()
    {
        IQueryable<TEntity> GetAll();
        void Add(TEntity entity);
        TEntity Update(TEntity entity);
        void Remove(TEntity entity);
        Task SaveChanges();
    }
}
