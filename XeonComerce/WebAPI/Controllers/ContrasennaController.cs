using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContrasennaController : ControllerBase
    {

        [HttpGet]
        public List<Contrasenna> Get()
        {
            var cm = new ContrasennaManagement();
            return cm.RetrieveAll();
        }


        [HttpGet("send/{id}")]
        public IActionResult Send(string id)
        {
            try
            {
                var cm = new ContrasennaManagement();

                var um = new UsuarioManagement();
                Usuario usuario = um.RetrieveById(new Usuario { Id = id });

                if (usuario == null) throw new Exception("Usuario no encontrado");

                char[] str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_[]/-!$%&()".ToCharArray();
                string pwd = "";
                for (int i = 0; i < 8; i++) pwd += str[new Random().Next(73)];


                Contrasenna contrasenna = new Contrasenna { IdUsuario = usuario.Id, FechaActualizacion = DateTime.Now, contrasenna = CreateMD5(pwd), estado="A" };
                cm.Create(contrasenna);
                Excecute(pwd, usuario).Wait();
                return Ok(new { msg = "Se envió la contraseña al correo" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
        private static async Task Excecute(string str, Usuario user)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("brutchm@ucenfotec.ac.cr", "GetItSafely");
            var subject = "Contraseña de GetItSafely";
            var to = new EmailAddress(user.CorreoElectronico, user.Nombre);
            var plainTextContent = ("Bienvenido a GetItSafely su contraseña es: " + str + ".");
            var htmlContent = "<strong>Bienvenido a GetItSafely su contraseña es: '" + str + "' ." + "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
        public static string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }
        [HttpPost]
        public IActionResult Create(Contrasenna contrasenna)
        {
            try
            {
                var cm = new ContrasennaManagement();
                List<Contrasenna> claves = cm.RetrieveAll();
                claves = claves.FindAll(x => x.estado == "I" && x.IdUsuario.Equals(contrasenna.IdUsuario));
                if(claves.Count != 0) { 
                claves.Sort((x, y) => DateTime.Compare(x.FechaActualizacion, y.FechaActualizacion));
                claves.Reverse();
                    var configM = new ConfigManagement();
                    Config cfg = configM.RetrieveById(new Config{ Id = "CONTRASENNA_VALIDA_H" });
                    int num = 5;
                    int numOriginal = 5;
                    if (cfg != null) {
                        numOriginal = (int)cfg.Valor;
                        num = (int)cfg.Valor;
                    }
                    if (claves.Count < num) num = claves.Count;
                for (int i = 0; i<num; i++)
                {
                    if (claves[i] != null && (CreateMD5(contrasenna.contrasenna).Equals(claves[i].contrasenna))) throw new Exception("La contraseña no puede ser igual a las " + numOriginal + " últimas");
                }
                }
                if (contrasenna.contrasenna.Length < 8) throw new Exception("La contraseña no incluye los caracteres requeridos");

                contrasenna.FechaActualizacion = DateTime.Now;
                contrasenna.contrasenna = CreateMD5(contrasenna.contrasenna);
                contrasenna.estado = "A";
                cm.Create(contrasenna);
                return Ok(new { msg = "La contraseña cambió satisfactoriamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public Contrasenna GetById(int id)
        {
            var cm = new ContrasennaManagement();
            Contrasenna contrasenna = new Contrasenna();
            contrasenna.Id = id;
            return cm.RetrieveById(contrasenna);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Contrasenna contrasenna, int id)
        {
            try
            {
                var cm = new ContrasennaManagement();
                contrasenna.Id = id;
                if (GetById(id) != null)
                {
                    cm.Update(contrasenna);
                    return Ok("Se actualizó la contraseña");
                }
                else
                {
                    return StatusCode(500, new { msg = "No se encontró dicha contraseña" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var cm = new ContrasennaManagement();
                var contrasenna = new Contrasenna { Id = id };
                cm.Delete(contrasenna);

                return Ok("Se eliminó la contraseña");

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
