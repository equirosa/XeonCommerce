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
    [Route("api/cupones")]
    [ApiController]
    public class CuponController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var cpn = new CuponManagement();
                
                return Ok(cpn.RetrieveAll());
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
                var cpn = new CuponManagement();
                Cupon cupon = new Cupon();
                cupon.Id = id;
                if (cupon == null || cupon.Id < 1)
                {
                    return NotFound();
                }
                
                return Ok(cpn.RetrieveById(cupon));
            }
            catch (Exception ex)
            {

                return StatusCode(500);
            }
        }

        [HttpPost]
        public ActionResult Post(Cupon cupon)
        {
            try
            {
                var cpn = new CuponManagement();
                cpn.Create(cupon);

                return Ok("Se registro el cupón con exito");
                //Ir a la base de datos para crear el cupon y obtener el Id.
                //return CreatedAtAction(nameof(GetById), new { id = cupon.Id }, cupon);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, Cupon cupon)
        {
                try
                {
                    var cpn = new CuponManagement();
                    cupon.Id = id;
                    //Validar que el objeto exista en la base de datos, cuponmanagement getById
                    if (GetById(id) == null)
                    {
                        return BadRequest();
                    }
                    else
                    {
                        cpn.Update(cupon);
                        return NoContent();
                    }

                }
                catch (Exception ex)
                {
                    return StatusCode(500);
                }
        }

        [HttpDelete ("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var cpn = new CuponManagement();
                var cupon = new Cupon { Id = id };
                cpn.Delete(cupon);

                return Ok("Se ha eliminado eliminado el cupón");

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
