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
    public class DireccionController: ControllerBase
    {
        private DireccionManagement dm = new DireccionManagement();

        [HttpGet]
        public List<Direccion> RetriveAll()
        {
            return dm.RetriveAll();
        }

        [HttpGet]
        public Direccion RetriveById(string id)
        {
            var direccion = new Direccion()
            {
                Id = Int32.Parse(id)
            };
            return dm.RetriveById(direccion);
        }

        [HttpPost]
        public IActionResult Create(Direccion d)
        {
            try
            {
                var dm = new DireccionManagement();
                dm.Create(d);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPut]
        public IActionResult Update(Direccion d)
        {
            try
            {
                dm.Update(d);
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
                Direccion d = new Direccion();
                d.Id = Int32.Parse(id);
                dm.Delete(d);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
