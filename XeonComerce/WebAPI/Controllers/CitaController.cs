using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                citaManag.Create(citaProducto);

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

    }
}
