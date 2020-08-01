using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComercioController : ControllerBase
    {

        [HttpGet]
        public List<Comercio> Get()
        {
            var cm = new ComercioManagement();
            return cm.RetrieveAll();
        }
        [HttpGet("{cedula}")]
        public Comercio GetById(string cedula)
        {
            var cm = new ComercioManagement();
            Comercio comercio = new Comercio();
            comercio.CedJuridica = cedula;
            return cm.RetrieveById(comercio);
        }


        [HttpPost]
        public IActionResult Create(Comercio comercio)
        {
            try
            {
                var cm = new ComercioManagement();
                var um = new UsuarioManagement();
                Comercio existe = cm.RetrieveById(comercio);

                if (existe != null && existe.CedJuridica == comercio.CedJuridica) throw new Exception("¡Dicha cédula jurídica ya existe!");
                if (!(new EmailAddressAttribute().IsValid(comercio.CorreoElectronico))) throw new Exception("¡Formato de correo erroneo!");
                if(String.IsNullOrEmpty(comercio.NombreComercial) || comercio.NombreComercial.Length<=5) throw new Exception("¡El nombre comercial debe contener más de 5 letras!");
                if(comercio.CedJuridica.Length<=6) throw new Exception("¡La cédula jurídica debe contener más de 6 caracteres!");
                Usuario adminComercio = um.RetrieveById(new Usuario { Id = comercio.IdUsuario });
                List<Comercio> comercios = cm.RetrieveAll();
                if (adminComercio == null) throw new Exception("¡Dicho usuario no existe!");
                Comercio encontrado = comercios.Find(i => i.IdUsuario == comercio.IdUsuario);
                if(encontrado != null) throw new Exception("¡Dicho usuario ya es administrador de un comercio!");
                cm.Create(comercio);
                return Ok(new { msg = "Se creó el comercio" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPut("{cedula}")]
        public IActionResult Update(Comercio comercio, string cedula)
        {
            try
            {
                string estadoViejo = "P";
                var cm = new ComercioManagement();
                comercio.CedJuridica = cedula;
                Comercio com = GetById(cedula);
                if (com != null)
                {
                    estadoViejo = com.Estado;
                    if (!(new EmailAddressAttribute().IsValid(comercio.CorreoElectronico))) throw new Exception("¡Formato de correo erroneo!");
                    if (String.IsNullOrEmpty(comercio.NombreComercial) || comercio.NombreComercial.Length <= 5) throw new Exception("¡El nombre comercial debe contener más de 5 letras!");
                    if(estadoViejo != comercio.Estado)
                    {
                        var um = new UsuarioManagement();
                        Usuario user = um.RetrieveById(new Usuario { Id = comercio.IdUsuario });
                        if(user != null)
                        {
                            Execute(user, comercio).Wait();
                        }
                    }
                    cm.Update(comercio);
                    return Ok(new { msg = "Se actualizó el comercio" });
                }
                else
                {
                    return StatusCode(500, new { msg = "No se encontró dicho comercio" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        private static async Task Execute(Usuario usuario, Comercio comercio)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("brutchm@ucenfotec.ac.cr", "GetItSafely");
            var subject = "Solicitud de su comercio";
            var to = new EmailAddress(usuario.CorreoElectronico.ToString(), usuario.Nombre.ToString());
            var plainTextContent = "";
            var htmlContent = "";
            if (comercio.Estado == "A") {
            plainTextContent = ("Su solicitud del comercio " + comercio.NombreComercial + " | " + comercio.CedJuridica + " fue aceptada.");
            htmlContent = "<strong>Su solicitud del comercio " + comercio.NombreComercial + " | " + comercio.CedJuridica + " fue aceptada. </strong>";
            }
            else
            {
            plainTextContent = ("Su solicitud del comercio " + comercio.NombreComercial + " | " + comercio.CedJuridica + " fue rechazada.");
            htmlContent = "<strong>Su solicitud del comercio " + comercio.NombreComercial + " | " + comercio.CedJuridica + " fue rechazada. </strong>";
            }
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        [HttpDelete("{cedula}")]
        public IActionResult Delete(string cedula)
        {
            try
            {
                var cm = new ComercioManagement();
                var comercio = new Comercio { CedJuridica = cedula };
                cm.Delete(comercio);

                return Ok(new { msg = "Se eliminó el comercio" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
