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
                cat.Create(usuario);
                return Ok("Se creó el usuario");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public Usuario EmailVerification(string id) 
        {
            char[] letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            char[] numeros = "0123456789".ToCharArray();
            string codigo="";
            for (int i=0; i < 4; i++) 
            {
                codigo = codigo + letras[random.Next(26)];
                codigo = codigo + numeros[random.Next(10)];
            }

            Usuario user = new Usuario();
            user.Id = id;
            user.Token = codigo;
            var management = new UsuarioManagement();
            Usuario usuario = management.MailVerification(user);

            Excecute(user).Wait();

            return usuario;
        }

        private static async Task Excecute(Usuario user)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("brutchm@ucenfotec.ac.cr", "GetItSafely");
            var subject = "Codigo de verificacion";
            var to = new EmailAddress(user.CorreoElectronico, user.Nombre);
            var plainTextContent = ("Bienvenido a GetItSafely su codigo de verificacion es: "+user.Token+".");
            var htmlContent = "<strong>Bienvenido a GetItSafely su codigo de verificacion es: " + user.Token + "."+"</strong>";
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
            string accountSid = "AC6a787e4346370cea568886d947a8920e";
            string authToken = "c2f12c374d9374bb0672c8e04dde5ff6";

            TwilioClient.Init(accountSid, authToken);

            var to = new PhoneNumber(usuario.NumeroTelefono);//esto se cambia por le numero del usuario pero tiene que estar verificado en twilio
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
                    cat.Update(usuario);
                    return Ok("Se actualizó el usuario");
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

                return Ok("Se eliminó el usuario");

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
