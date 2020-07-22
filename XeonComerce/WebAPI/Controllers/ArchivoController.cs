using AppCore;
using Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ArchivoController: ControllerBase
    {
        private ArchivoManagement am = new ArchivoManagement();

        [HttpGet]
        public List<Archivo> RetriveAll()
        {
            return am.RetriveAll();
        }

        [HttpGet]
        public Archivo RetriveById(string id)
        {
            var archivo = new Archivo()
            {
                Id = Int32.Parse(id)
            };
            return am.RetriveById(archivo);
        }

        [HttpPost]
        public IActionResult Create (Archivo a)
        {
            try
            {
                var am = new ArchivoManagement();
                am.Create(a);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPut]
        public IActionResult Update(Archivo a)
        {
            try
            {
                am.Update(a);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete]
        public IActionResult Delete(string id)
        {
            try
            {
                Archivo a = new Archivo();
                a.Id = Int32.Parse(id);
                am.Delete(a);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
