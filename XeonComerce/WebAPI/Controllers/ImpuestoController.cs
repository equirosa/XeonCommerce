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
    [Route("api/impuesto")]
    [ApiController]
    public class ImpuestoController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var im = new ImpuestoManagement();

                return Ok(im.RetrieveAll());
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            try
            {
                var im = new ImpuestoManagement();
                Impuesto impuesto = new Impuesto();
                impuesto.Id = id;
                if (impuesto.Id < 1)
                {
                    return NotFound();
                }

                return Ok(im.RetrieveById(impuesto));
            }
            catch (Exception ex)
            {

                return StatusCode(500);
            }
        }

        [HttpPost]
        public ActionResult Post(Impuesto impuesto)
        {
            try
            {
                var im = new ImpuestoManagement();
                im.Create(impuesto);

                return Ok("Se registro el impuesto con exito");
                //Ir a la base de datos para crear el cupon y obtener el Id.
                //return CreatedAtAction(nameof(GetById), new { id = cupon.Id }, cupon);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, Impuesto impuesto)
        {
            try
            {
                var im = new ImpuestoManagement();
                impuesto.Id = id;
                //Validar que el objeto exista en la base de datos, cuponmanagement getById
                if (GetById(id) == null)
                {
                    return BadRequest();
                }
                else
                {
                    im.Update(impuesto);
                    return NoContent();
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var im = new ImpuestoManagement();
                var impuesto = new Impuesto { Id = id };
                im.Delete(impuesto);

                return Ok("Se ha eliminado eliminado el impuesto");

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
