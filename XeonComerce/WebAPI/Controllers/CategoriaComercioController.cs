using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaComercioController : ControllerBase
    {

        [HttpGet]
        public List<CategoriaComercio> Get()
        {
            var cat = new CategoriaComercioManagement();
            return cat.RetrieveAll();
        }


        [HttpGet("{comercio}")]
        public List<CategoriaComercio> GetByIdComercio(string comercio)
        {
            var cat = new CategoriaComercioManagement();
            CategoriaComercio cc = new CategoriaComercio { IdComercio = comercio };
            return cat.RetrieveByComercio(cc);
        }

        [HttpGet("{comercio}/{categoria}")]
        public CategoriaComercio GetById(string comercio, int categoria)
        {
            var cat = new CategoriaComercioManagement();
            CategoriaComercio cc = new CategoriaComercio { IdCategoria = categoria, IdComercio = comercio };
            return cat.RetrieveById(cc);
        }


        [HttpPost]
        public IActionResult Create(CategoriaComercio cc)
        {
            try
            {
                var cat = new CategoriaComercioManagement();
                cat.Create(cc);
                return Ok(new { msg = "Se agregó la categoria al comercio" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete]
        public IActionResult Delete(CategoriaComercio cc)
        {
            try
            {
                var cat = new CategoriaComercioManagement();
                cat.Delete(cc);

                return Ok(new { msg = "Se removió la categoria al comercio" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{comercio}")]
        public IActionResult DeleteAll(string comercio)
        {
            try
            {
                var cat = new CategoriaComercioManagement();
                cat.DeleteAll(new CategoriaComercio { IdComercio=comercio });

                return Ok(new { msg = "Se removieron todas las categorías al comercio" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
