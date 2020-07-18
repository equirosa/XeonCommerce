using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HorarioEmpleadoController : ControllerBase
    {
        [HttpGet]
        public List<HorarioEmpleado> RetrieveAll()
        {
            var horarioEmpleadoManag = new HorarioEmpleadoManagement();
            return horarioEmpleadoManag.RetrieveAll();
        }


        [HttpGet]
        public HorarioEmpleado RetrieveById(int id)
        {
            var horarioEmpleadoManag = new HorarioEmpleadoManagement();

            var horarioEmpleado = new HorarioEmpleado()
            {
                Id = id
            };

            return horarioEmpleadoManag.RetrieveById(horarioEmpleado);

        }

        [HttpPost]
        public IActionResult Create(HorarioEmpleado horarioEmpleado)
        {
            try
            {
                var horarioEmpleadoManag = new HorarioEmpleadoManagement();

                horarioEmpleadoManag.Create(horarioEmpleado);

                return Ok();


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public IActionResult Update(HorarioEmpleado horarioEmpleado)
        {
            try
            {
                var horarioEmpleadoManag = new HorarioEmpleadoManagement();

                horarioEmpleadoManag.Update(horarioEmpleado);

                return Ok();


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var horarioEmpleado = new HorarioEmpleado();
            horarioEmpleado.Id = id;

            try
            {
                var horarioEmpleadoManag = new HorarioEmpleadoManagement();

                horarioEmpleadoManag.Delete(horarioEmpleado);

                return Ok();


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

    }
}
