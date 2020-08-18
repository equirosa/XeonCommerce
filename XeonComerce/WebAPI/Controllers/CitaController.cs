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
                //var citaManag = new CitaManagement();
                //var um = new UsuarioManagement();

                //citaManag.Create(citaProducto);

                //Usuario usuario = um.RetrieveById(new Usuario { Id = citaProducto.IdCliente });
                
                //var info = "Bienvenido a GetItSafely se ha agendado su cita, información: " + citaProducto.HoraInicio.ToString("MM/dd/yy") + ".";

                //Excecute(info, usuario).Wait();

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

        [HttpPost]
        public IActionResult NotificarCliente(CitaProducto citaProducto)
        {
            try
            {
                var citaManag = new CitaManagement();
                var um = new UsuarioManagement();
                Usuario usuario = um.RetrieveById(new Usuario { Id = citaProducto.IdCliente });


                var msg = "Le recordamos que tiene una cita para el dia: " + citaProducto.HoraInicio.ToString("yyyy-MM-dd") +". Gracias por confiar en nosotros, lo esperamos!!";
                Excecute(msg, usuario).Wait();

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
            var plainTextContent = (info);
            var htmlContent = "<strong>"+info+ "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }


        [HttpPut]
        public IActionResult CancelarUsr(CitaProducto citaProducto)
        {
            try
            {
                var citaManag = new CitaManagement();
                citaManag.CancelarCitaUsuario(citaProducto);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

    }
}
