using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BitacoraController : ControllerBase
    {

        [HttpGet]
        public List<Bitacora> Get()
        {
            var bm = new BitacoraManagement();
            return bm.RetrieveAll();
        }

        [HttpPost]
        public IActionResult Create(Bitacora bitacora)
        {
            try
            {
                var bm = new BitacoraManagement();
                Usuario user = new UsuarioManagement().RetrieveById(new Usuario { Id = bitacora.IdUsuario });
                if (user == null) throw new Exception("Dicho usuario no existe");
                bitacora.Fecha = DateTime.Now;
                bm.Create(bitacora);
                return Ok(new { msg = "Se creó el registro satisfactoriamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public Bitacora GetById(int id)
        {
            var bm = new BitacoraManagement();
            return bm.RetrieveById(new Bitacora { Id = id });
        }

    }
}
