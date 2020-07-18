using System;
using System.Collections.Generic;
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
                cm.Create(comercio);
                return Ok("Se creó el comercio");
            }
            catch (Exception ex)
            {
                return StatusCode(500);
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
                    return Ok("Se actualizó el comercio");
                }
                else
                {
                    return StatusCode(500);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500);
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

                return Ok("Se eliminó el comercio");

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
