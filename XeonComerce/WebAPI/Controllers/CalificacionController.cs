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
    [Route("api/calificacion")]
    [ApiController]
    public class CalificacionController : ControllerBase
    {
        private CalificacionManagement cm = new CalificacionManagement();

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(cm.RetrieveAll());
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex);
            }
        }

        [HttpPost]
        public ActionResult Post(Calificaciones calificacion)
        {
            try
            {
                cm.Create(calificacion);

                return Ok(new { msg = "Se registro con exito" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var calificacion = new Calificaciones { Id = id };
                cm.Delete(calificacion);

                return Ok(new { msg = "Se ha eliminado" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
