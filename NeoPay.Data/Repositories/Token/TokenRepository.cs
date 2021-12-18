using Microsoft.EntityFrameworkCore;
using NeoPay.Data.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace NeoPay.Data.Repositories
{
    public class TokenRepository: Repository<RefreshToken>, ITokenRepository
    {
        public TokenRepository(NeoPayContext context)
           : base(context)
        {
        }

        public async Task<RefreshToken> GetByTokenAsync(string token)
        {
            return await base.GetAll().Where(a => a.Token == token).FirstOrDefaultAsync();
        }

        public override async Task<RefreshToken> AddAsync(RefreshToken refreshToken)
        {
            await base.AddAsync(refreshToken);
            await SaveChanges();
            return refreshToken;
        }
    }
}
