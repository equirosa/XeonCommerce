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
    public class RolController : ControllerBase
    {
        private RolManagement rm = new RolManagement();

        // GET: api/Rol
        [HttpGet]
        public List<Rol> RetriveAll()
        {
            return rm.RetriveAll();
        }

        // GET: api/Rol/5
        [HttpGet]
        public Rol RetriveById(string id)
        {
            var rol = new Rol()
            {
                Id = Int32.Parse(id)
            };
            return rm.RetriveById(rol);
        }

        // POST: api/Rol
        [HttpPost]
        public IActionResult Create(Rol o)
        {
            try
            {
                rm.Create(o);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        // PUT: api/Rol/5
        [HttpPut]
        public IActionResult Update(Rol o)
        {
            try
            {
                rm.Update(o);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        public IActionResult Delete(string id)
        {
            try
            {
                Rol o = new Rol();
                o.Id = Int32.Parse(id);
                rm.Delete(o);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
