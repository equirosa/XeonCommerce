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
    [Route("api/listaDeseos")]
    [ApiController]
    public class ListaDeseosController : ControllerBase
    {

        private ListaDeseosManagement ldm = new ListaDeseosManagement();

        [HttpGet("{idUsuario}")]
        public ActionResult RetriveAll(string idUsuario)
        {
            return Ok(ldm.RetrieveAll(new ListaDeseos { IdUsuario = idUsuario }));
        }

        [HttpPost]
        public IActionResult Create(ListaDeseos ltsDeseos)
        {
            try
            {
                ldm.Create(ltsDeseos);

                return Ok(new { msg = "Se registro con exito" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{idUsuario}/{idProducto}")]
        public IActionResult Delete(string idUsuario, int idProducto)
        {
            try
            {
                ldm.Delete(new ListaDeseos { IdUsuario = idUsuario, IdProducto = idProducto });
                return Ok(new { msg = "Se eliminó el producto de la lista de deseos" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }

        [HttpDelete("{idUsuario}")]
        public IActionResult DeleteAll(string idUsuario)
        {
            try
            {
                ldm.DeleteAll(new ListaDeseos { IdUsuario = idUsuario });
                return Ok(new { msg = "Se eliminó la lista de deseos" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }

        [HttpPut]
        public IActionResult Update(ListaDeseos ltsDeseos)
        {
            try
            {
                ldm.Update(ltsDeseos);
                return Ok(new { msg = "Se actualizó la cantidad" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }

    }
}
