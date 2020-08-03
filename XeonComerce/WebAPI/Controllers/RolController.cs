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

      
        [HttpGet]
        public List<Rol> RetriveAll()
        {
            return rm.RetriveAll();
        }

        
        [HttpGet]
        public VistaRol RetriveById(int id)
        {
            var rol = new Rol()
            {
                Id = id
            };
            return rm.RetriveById(rol);
        }

        
        [HttpPost]
        public IActionResult Create(VistaRol vistaRol)
        {
            try
            {
                rm.Create(vistaRol);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msj = e.Message });
            }
        }

        [HttpPut]
        public IActionResult Update(VistaRol vistaRol)
        {
            try
            {
                rm.Update(vistaRol);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msj = e.Message});
            }
        }

     
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

            
        [HttpGet]
        public List<VistaRol> GetRolesByIdComercio(string idComercio)
        {
            return rm.GetRolesComercio(idComercio);
        }

    }
}
