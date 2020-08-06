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
    public class FacturaDetalleController : ControllerBase
    {

        [HttpGet]
        public List<FacturaDetalle> Get()
        {
            var cm = new FacturaDetalleManagement();
            return cm.RetriveAll();
        }

        [HttpGet("{id}")]
        public FacturaDetalle GetById(int id)
        {
            var cm = new FacturaDetalleManagement();
            FacturaDetalle tF = new FacturaDetalle();
            tF.IdFactura = id;
            return cm.RetriveById(tF);
        }

        [HttpPost]
        public IActionResult Create(FacturaDetalle tF)
        {
            try
            {
                var cm = new FacturaDetalleManagement();
                cm.Create(tF);
                return Ok(new { msg = "Se creó la linea de factura" });
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
                var cm = new FacturaDetalleManagement();
                var tF = cm.RetriveById(new FacturaDetalle { IdLinea = id});
                cm.Delete(tF);
                return Ok(new { msg = "Se eliminó la linea de factura" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
