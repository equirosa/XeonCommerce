using AppCore;
using Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SucursalController: ControllerBase
    {
        private SucursalManagement sm = new SucursalManagement();

        [HttpGet]
        public List<Sucursal> RetriveAll()
        {
            return sm.RetriveAll();
        }

        [HttpGet]
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
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPut]
        public IActionResult Update(Sucursal s)
        {
            try
            {
                sm.Update(s);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete]
        public IActionResult Delete(string id)
        {
            try
            {
                Sucursal s = new Sucursal();
                s.Id = id;
                sm.Delete(s);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
