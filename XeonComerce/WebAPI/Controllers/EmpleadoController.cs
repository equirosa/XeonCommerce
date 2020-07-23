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
    public class EmpleadoController : ControllerBase
    {

        [HttpGet]
        public List<Empleado> GetEmpleadosByIdSucursal(string idSucursal)
        {
            var empleadoManag = new EmpleadoManagement();
            return empleadoManag.GetEmpleadosByIdSucursal(idSucursal);
        }

        [HttpPost]
        public IActionResult Create(Empleado empleado)
        {
            try
            {
                var empleadoMang = new EmpleadoManagement();

                empleadoMang.Create(empleado);

                return Ok();


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }




    }
}
