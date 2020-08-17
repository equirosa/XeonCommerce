using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Management;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CitaController : ControllerBase
    {

        [HttpPost]
        public IActionResult Create(CitaProducto citaProducto)
        {
            try
            {
                var citaManag = new CitaManagement();
                var um = new UsuarioManagement();

                citaManag.Create(citaProducto);

                Usuario usuario = um.RetrieveById(new Usuario { Id = citaProducto.IdCliente });

                var info = citaProducto.HoraInicio.ToString("MM/dd/yy");

                Excecute(info, usuario).Wait();

                return Ok();
            } 
            catch( Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }


        [HttpGet]
        public List<CitaProducto> RetrieveAll()
        {
            var citaManag = new CitaManagement();
            return citaManag.RetrieveAll(); 
        }

        [HttpPut]
        public IActionResult Cancelar(CitaProducto citaProducto)
        {
            try
            {
                var citaManag = new CitaManagement();
                citaManag.CancelarCita(citaProducto);
                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPut]
        public IActionResult Finalizar(CitaProducto citaProducto)
        {
            try
            {
                var citaManag = new CitaManagement();
                citaManag.FinalizarCita(citaProducto);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }

        }


        private static async Task Excecute(string info, Usuario user)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("brutchm@ucenfotec.ac.cr", "GetItSafely");
            var subject = "Inofrmacion de la cita con GetItSafely";
            //var to = new EmailAddress(user.CorreoElectronico, user.Nombre);
            var to = new EmailAddress("jarguelloq@ucenfotec.ac.cr", user.Nombre);
            var plainTextContent = ("Bienvenido a GetItSafely se ha agendado su cita, información: " + info + ".");
            var htmlContent = "<strong>Gracias por preferir GetItSafely, la información de su cita es: '" + info + "' ." + "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

    }
}
