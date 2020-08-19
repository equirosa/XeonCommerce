using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Management;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCoder;
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

                if (citaProducto.Tipo == "P")
                {
                    citaManag.Create(citaProducto);
                }
                else
                {
                    citaManag.CreateCitaServicio(citaProducto);
                }


                Usuario usuario = um.RetrieveById(new Usuario { Id = citaProducto.IdCliente });

                var info = "Bienvenido a GetItSafely se ha agendado su cita, información: " + citaProducto.HoraInicio.ToString("MM/dd/yy") + ".";

                var qr = this.GenerarQR(citaProducto);

                ExcecuteCreacionCita(qr, info, usuario).Wait();

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
            var to = new EmailAddress(user.CorreoElectronico, user.Nombre);
            var plainTextContent = (info);
            var htmlContent = "<strong>"+info+ "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        private static async Task ExcecuteCreacionCita(Bitmap qr, string info, Usuario user)
        {

            Byte[] data;

            using (var memoryStream = new MemoryStream())
            {
                qr.Save(memoryStream, ImageFormat.Jpeg);

                data = memoryStream.ToArray();
            }
            

            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("brutchm@ucenfotec.ac.cr", "GetItSafely");
            var subject = "Inofrmacion de la cita con GetItSafely";
            var to = new EmailAddress(user.CorreoElectronico, user.Nombre);
            var plainTextContent = (info);
            var htmlContent = "<strong>" + info + "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            msg.AddAttachment("Codigo.jpeg", Convert.ToBase64String(data));
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

       
        private Bitmap GenerarQR(CitaProducto cita)
        {
           
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode("Cliente: "+cita.IdCliente+"IDCita:"+cita.Id, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(20);


            return qrCodeImage;
        }

    }
}
