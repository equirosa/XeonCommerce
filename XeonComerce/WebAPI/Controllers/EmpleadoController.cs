using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Management;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;

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

        //[HttpPost]
        //public IActionResult Create(Empleado empleado)
        //{
        //    try
        //    {
        //        var empleadoMang = new EmpleadoManagement();

        //        empleadoMang.Create(empleado);

        //        return Ok();


        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ex);
        //    }
        //}


        [HttpPost]
        public IActionResult Create(EmpleadoComercioSucursal empleado)
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


        [HttpGet]
        public string VerificarUsuario(string idUsuario)
        {
                   
            var empleadoManag = new EmpleadoManagement();
            return empleadoManag.VerificarUsuario(idUsuario);
        }


        [HttpDelete]
        public IActionResult Delete(int idEmpleado)
        {
            try
            {
                var empleadoManag = new EmpleadoManagement();
                empleadoManag.Delete(idEmpleado);

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }

        }




    }
}
