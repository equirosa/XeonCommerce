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
    public class SucursalController : ControllerBase
    {
        private SucursalManagement sm = new SucursalManagement();

        [HttpGet]
        public List<Sucursal> RetriveAll()
        {
            return sm.RetriveAll();
        }

        [HttpGet("{id}")]
        public Sucursal RetriveById(string id)
        {
            
            var sucursal = new Sucursal()
            {
                Id = id
            };
            return sm.RetriveById(sucursal);
        }

        [HttpPost]
        public IActionResult Create(Sucursal s)
        {
            try
            {
                sm.Create(s);
                return Ok(new { msg = "Se creó" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Sucursal s)
        {
            try
            {
                sm.Update(s);
                return Ok(new { msg = "Se actualizó la sucursal" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                Sucursal s = new Sucursal();
                s.Id = id;
                sm.Delete(s);
                return Ok(new { msg = "Sucursal eliminada" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }
    }
}
