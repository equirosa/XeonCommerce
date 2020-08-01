using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebAPI.Services;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly Random random = new Random();

        [HttpGet]
        public List<Usuario> Get()
        {
            var cat = new UsuarioManagement();
            return cat.RetrieveAll();
        }

        [HttpGet("{id}")]
        public Usuario GetById(string id)
        {
            var cat = new UsuarioManagement();
            Usuario usuario = new Usuario();
            usuario.Id = id;
            return cat.RetrieveById(usuario);
        }


        [HttpPost]
        public IActionResult Create(Usuario usuario)
        {
            try
            {
                var cat = new UsuarioManagement();
                Usuario existe = cat.RetrieveById(usuario);
                if (existe != null && existe.Id == usuario.Id) throw new Exception("¡Dicha cédula ya existe!");
                if (!(new EmailAddressAttribute().IsValid(usuario.CorreoElectronico))) throw new Exception("¡Formato de correo erroneo!");
                if (String.IsNullOrEmpty(usuario.Nombre) || usuario.Nombre.Length <= 1) throw new Exception("¡Nombre debe tener más de 1 letra!");
                if (String.IsNullOrEmpty(usuario.ApellidoUno) || usuario.ApellidoUno.Length <= 1) throw new Exception("¡Primer apellido debe tener más de 1 letra!");
                if (usuario.Id.Length <= 6) throw new Exception("¡La cédula debe contener más de 6 caracteres!");
                cat.Create(usuario);
                return Ok(new { msg = "Se creó el usuario" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult EmailVerification(string id)
        {
            try
            {
                char[] letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            char[] numeros = "0123456789".ToCharArray();
            string codigo="";
            for (int i=0; i < 4; i++) 
            {
                codigo = codigo + letras[random.Next(26)];
                codigo = codigo + numeros[random.Next(10)];
            }

            var um = new UsuarioManagement();
            Usuario usuario = um.RetrieveById(new Usuario { Id = id });
            if (usuario == null) throw new Exception("Usuario no encontrado");
            usuario.Token = codigo;
            usuario = um.MailVerification(usuario);

                Execute(usuario).Wait();
            return Ok(new { msg = "Se envió el código al correo" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        private static async Task Execute(Usuario user)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("brutchm@ucenfotec.ac.cr", "GetItSafely");
            var subject = "Codigo de verificacion";
            var to = new EmailAddress(user.CorreoElectronico.ToString(), user.Nombre.ToString());
            var plainTextContent = ("Bienvenido a GetItSafely su codigo de verificacion es: "+user.Token.ToString() + ".");
            var htmlContent = "<strong>Bienvenido a GetItSafely su codigo de verificacion es: " + user.Token.ToString() + "."+"</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        [HttpPut("{id}")]
        public Usuario PhoneVerification(string id)
        {
            char[] letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            char[] numeros = "0123456789".ToCharArray();
            string codigo = "";
            for (int i = 0; i < 4; i++)
            {
                codigo = codigo + letras[random.Next(26)];
                codigo = codigo + numeros[random.Next(10)];
            }

            Usuario user = new Usuario();
            user.Id = id;
            user.Token = codigo;
            var management = new UsuarioManagement();
            Usuario usuario = management.PhoneVerification(user);

            enviarMensage(usuario);

            return usuario;
        }

        private void enviarMensage(Usuario usuario)
        {
            if (usuario.Token == null || usuario.Token == "") return;
            string accountSid = "AC6a787e4346370cea568886d947a8920e";
            string authToken = "c2f12c374d9374bb0672c8e04dde5ff6";

            TwilioClient.Init(accountSid, authToken);

            var to = new PhoneNumber("+506"+usuario.NumeroTelefono);//esto se cambia por le numero del usuario pero tiene que estar verificado en twilio
            var from = new PhoneNumber("+19168846897");

            var message = MessageResource.Create(
                to: to,
                from: from,
                body: "Bienvenido a GetItSafely su codigo de verificacion es: "+usuario.Token+""
            );
        }

        [HttpPut("{id}")]
        public IActionResult Update(Usuario usuario, string id)
        {
            try
            {
                var cat = new UsuarioManagement();
                usuario.Id = id;
                if (GetById(id) != null)
                {
                    if (!(new EmailAddressAttribute().IsValid(usuario.CorreoElectronico))) throw new Exception("¡Formato de correo erroneo!");
                    if (String.IsNullOrEmpty(usuario.Nombre) || usuario.Nombre.Length <= 1) throw new Exception("¡Nombre debe tener más de 1 letra!");
                    if (String.IsNullOrEmpty(usuario.ApellidoUno) || usuario.ApellidoUno.Length <= 1) throw new Exception("¡Primer apellido debe tener más de 1 letra!");
                    cat.Create(usuario);
                    return Ok(new { msg = "Se actualizó el usuario" });
                    cat.Update(usuario);
                }
                else
                {
                    return StatusCode(500, new { msg = "No se encontró dicho usuario" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var cat = new UsuarioManagement();
                var usuario = new Usuario { Id = id };
                cat.Delete(usuario);

                return Ok(new { msg = "Se eliminó el usuario" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
