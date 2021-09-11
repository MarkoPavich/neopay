using Microsoft.AspNetCore.Mvc;
using NeoPay.Dtos;
using NeoPay.Service.UserServices;
using System.Threading.Tasks;

namespace NeoPay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticateResponse>> Register(RegisterRequest request)
        {
            await _userService.RegisterUserAsync(request);
            return Ok();
        }
    }
}
