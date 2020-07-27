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
    public class SeccionHorarioController : ControllerBase
    {
        [HttpGet]
        public List<SeccionHorario> RetrieveAll()
        {
            var seccionHorarioManag = new SeccionHorarioManagement();
            return seccionHorarioManag.RetrieveAll();
        }


        [HttpGet]
        public SeccionHorario RetrieveById(int id)
        {
            var seccionHorarioManag = new SeccionHorarioManagement();

            var seccionHorario = new SeccionHorario()
            {
                Id = id
            };

            return seccionHorarioManag.RetrieveById(seccionHorario);

        }

        [HttpPost]
        public IActionResult Create(SeccionHorario seccionHorario)
        {
            try
            {
                var seccionHorarioManag = new SeccionHorarioManagement();

                seccionHorarioManag.Create(seccionHorario);

                return Ok();


            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPut]
        public IActionResult Update(SeccionHorario seccionHorario)
        {
            try
            {
                var seccionHorarioManag = new SeccionHorarioManagement();

                seccionHorarioManag.Update(seccionHorario);

                return Ok();


            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var seccionHorario = new SeccionHorario();
            seccionHorario.Id = id;

            try
            {
                var seccionHorarioManag = new SeccionHorarioManagement();

                seccionHorarioManag.Delete(seccionHorario);

                return Ok();


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }



        [HttpGet]
        public List<SeccionHorario> GetHorarioEmpleado(int idEmpleado, int diaSemana)
        {
            var seccionHorario = new SeccionHorario();
            seccionHorario.IdEmpleado = idEmpleado;
            seccionHorario.DiaSemana = diaSemana;

            var seccionHorarioManag = new SeccionHorarioManagement();
            return seccionHorarioManag.GetHorarioEmpleado(seccionHorario);
        }
    }
}
