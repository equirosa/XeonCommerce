using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SelectPdf;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiaFeriadoController : ControllerBase
    {

        [HttpGet]
        public List<DiaFeriado> Get()
        {
            var dF = new DiaFeriadoManagement();
            return dF.RetrieveAll();
        }
        [HttpGet("{id}")]
        public DiaFeriado GetById(int id)
        {
            var dF = new DiaFeriadoManagement();
            DiaFeriado diaF = new DiaFeriado();
            diaF.Id = id;
            return dF.RetrieveById(diaF);
        }


        [HttpPost]
        public IActionResult Create(DiaFeriado diaFeriado)
        {
            try
            {
                var dF = new DiaFeriadoManagement();
                DiaFeriado a = dF.RetrieveAll().Find((e) => e.Fecha.ToString("D", DateTimeFormatInfo.InvariantInfo) == diaFeriado.Fecha.ToString("D", DateTimeFormatInfo.InvariantInfo));
                if (a != null) throw new Exception("Esa día ya existe como feriado");
                dF.Create(diaFeriado);
                return Ok(new { msg = "Se agregó el día feriado." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
        [HttpPut("{id}")]
        public IActionResult Update(DiaFeriado diaF, int id)
        {
            try
            {
                var dF = new DiaFeriadoManagement();
                diaF.Id = id;
                DiaFeriado a = GetById(id);
                if (a != null)
                {
                    if (a.Fecha != diaF.Fecha)
                    {
                        DiaFeriado b = dF.RetrieveAll().Find((e) => e.Fecha.ToString("D", DateTimeFormatInfo.InvariantInfo) == diaF.Fecha.ToString("D", DateTimeFormatInfo.InvariantInfo));
                        if (b != null) throw new Exception("Esa día ya existe como feriado");
                    }
                    dF.Update(diaF);
                    return Ok(new { msg = "Se actualizó el día feriado" });
                }
                else
                {
                    return StatusCode(500, new { msg = "No se encontró dicho día feriado" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var dF = new DiaFeriadoManagement();
                var diaF = new DiaFeriado { Id = id };
                dF.Delete(diaF);

                return Ok(new { msg = "Se eliminó el día feriado" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
