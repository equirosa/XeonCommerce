using AppCore;
using Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AusenciasController : ControllerBase
    {

        [HttpGet]
        public List<Ausencias> Get()
        {
            var aus = new AusenciasManagement();
            return aus.RetrieveAll();
        }

        [HttpGet("{id}")]
        public Ausencias GetByID(string id)
        {
            var aus = new AusenciasManagement();
            Ausencias ausencias = new Ausencias();
            ausencias.Id = id;
            return aus.RetrieveById(ausencias);
        }

        [HttpPost]
        public IActionResult Create(Ausencias ausencias)
        {
            try
            {
                var aus = new AusenciasManagement();
                aus.Create(ausencias);
                return Ok("Se creó la configuración");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Ausencias ausencias, string id)
        {
            try
            {
                var aus = new AusenciasManagement();
                ausencias.Id = id;
                if (GetByID(id) != null)
                {
                    aus.Update(ausencias);
                    return Ok(new { msg = "Se actualizó la configuración" });
                }
                else
                {
                    return StatusCode(500, new { msg = "No se encontró la configuración" });
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
                var aus = new AusenciasManagement();
                var ausencias = new Ausencias { Id = id };
                aus.Delete(ausencias);

                return Ok("Se eliminó la configuración");

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
