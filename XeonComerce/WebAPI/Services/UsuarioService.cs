using Entities;
using Management;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Helpers;
using WebApi.Models;

namespace WebAPI.Services
{
    public interface IUsuarioService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        List<Usuario> GetAll();
        Usuario GetById(string id);
        Contrasenna GetClave(string id);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly AppSettings _appSettings;

        public UsuarioService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = GetAll().SingleOrDefault(x => x.CorreoElectronico.Equals(model.Email));
            if (user == null) return null;
            var clave = GetClave(user.Id);

            if (clave == null) return null;
            if (!clave.contrasenna.Equals(model.Clave)) return null;

            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public List<Usuario> GetAll()
        {
            return new UsuarioManagement().RetrieveAll();
        }

        public Usuario GetById(string id)
        {
            return GetAll().FirstOrDefault(x => x.Id.Equals(id));
        }

        private string generateJwtToken(Usuario user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public Contrasenna GetClave(string id)
        {
            List < Contrasenna > claves = new ContrasennaManagement().RetrieveAll();
            var clave = claves.FirstOrDefault(x => x.IdUsuario.Equals(id));
            if (clave == null) return null;
            else
            return clave;
        }
    }
}
