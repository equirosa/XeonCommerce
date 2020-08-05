using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranFinController : ControllerBase
    {

        [HttpGet]
        public List<TranFin> Get()
        {
            var cm = new TranFinManagement();
            return cm.RetriveAll();
        }
        [HttpGet("{id}")]
        public TranFin GetById(int id)
        {
            var cm = new TranFinManagement();
            TranFin tF = new TranFin();
            tF.Id = id;
            return cm.RetriveById(tF);
        }


        [HttpPost]
        public IActionResult Create(TranFin tF)
        {
            try
            {
                var cm = new TranFinManagement();
                cm.Create(tF);
                return Ok(new { msg = "Se creó la transacción"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(TranFin tF, int id)
        {
            try
            {
                var cm = new TranFinManagement();
                tF.Id = id;
                TranFin com = GetById(id);
                if (com != null)
                {
                    cm.Update(com);
                    return Ok(new { msg = "Se actualizó la transacción" });
                }
                else
                {
                    return StatusCode(500, new { msg = "No se encontró dicho comercio" });
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
                var cm = new TranFinManagement();
                var tF = cm.RetriveById(new TranFin { Id = id});
                cm.Delete(tF);
                return Ok(new { msg = "Se eliminó la transacción" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
