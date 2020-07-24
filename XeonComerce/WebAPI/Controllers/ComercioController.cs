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
                if(existe.CedJuridica == comercio.CedJuridica) throw new Exception("¡Dicha cédula jurídica ya existe!");
                if (!(new EmailAddressAttribute().IsValid(comercio.CorreoElectronico))) throw new Exception("¡Formato de correo erroneo!");
                if(String.IsNullOrEmpty(comercio.NombreComercial) || comercio.NombreComercial.Length<=5) throw new Exception("¡El nombre comercial debe contener más de 5 letras!");
                if(comercio.CedJuridica.Length<=6) throw new Exception("¡La cédula jurídica debe contener más de 6 caracteres!");
                Usuario adminComercio = um.RetrieveById(new Usuario { Id = comercio.IdUsuario });
                if(adminComercio.Id == comercio.IdUsuario) throw new Exception("¡Dicho usuario ya es administrador de un comercio!");
                if (adminComercio == null) throw new Exception("¡Dicho usuario no existe!");
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
                var cm = new ComercioManagement();
                comercio.CedJuridica = cedula;
                if (GetById(cedula) != null)
                {
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
