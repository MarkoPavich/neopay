using NeoPay.Data.Entities;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public interface ITokenRepository
    {
        public Task<RefreshToken> GetByTokenAsync(string token);
        public Task<RefreshToken> AddAsync(RefreshToken refreshToken);
        public void Remove(RefreshToken refreshToken);
        public Task SaveChanges();
    }
}
