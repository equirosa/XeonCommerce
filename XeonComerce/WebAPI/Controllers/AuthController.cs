using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private IUsuarioService _usuarioService;

        public AuthController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _usuarioService.Authenticate(model);

            if (response == null)
                return BadRequest(new { msg = "Email o contraseña incorrectas" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _usuarioService.GetAll();
            return Ok(users);
        }

        [HttpGet("test")]
        public IActionResult Get()
        {
            var users = _usuarioService.GetAll();
            return Ok(users);
        }
    }
}
