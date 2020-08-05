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
    public class FacturaMaestroController : ControllerBase
    {

        [HttpGet]
        public List<FacturaMaestro> Get()
        {
            var cm = new FacturaMaestroManagement();
            return cm.RetriveAll();
        }

        [HttpGet("{id}")]
        public FacturaMaestro GetById(int id)
        {
            var cm = new FacturaMaestroManagement();
            FacturaMaestro tF = new FacturaMaestro();
            tF.IdFactura = id;
            return cm.RetriveById(tF);
        }

        [HttpPost]
        public IActionResult Create(FacturaMaestro tF)
        {
            try
            {
                var cm = new FacturaMaestroManagement();
                cm.Create(tF);
                return Ok(new { msg = "Se creó la factura" });
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
                var cm = new FacturaMaestroManagement();
                var tF = cm.RetriveById(new FacturaMaestro { IdFactura = id});
                cm.Delete(tF);
                return Ok(new { msg = "Se eliminó la factura" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
