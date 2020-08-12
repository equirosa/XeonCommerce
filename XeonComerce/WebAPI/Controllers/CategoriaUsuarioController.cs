#region libraries
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
#endregion

namespace WebAPI.Controllers
{
    [Route("api/categoriasUsuario")]
    [ApiController]
    public class CategoriaUsuarioController : ControllerBase
    {
        [HttpGet]
        public List<CategoriaUsuario> Get()
        {
            var catUsuario = new CategoriaUsuarioManagement();
            return catUsuario.RetrieveAll();
        }


        [HttpGet("{usuario}")]
        public List<CategoriaUsuario> GetByIdComercio(string usuario)
        {
            var cat = new CategoriaUsuarioManagement();
            CategoriaUsuario cu = new CategoriaUsuario { IdUsuario = usuario };
            return cat.RetrieveByUsuario(cu);
        }

        [HttpGet("{usuario}/{categoria}")]
        public CategoriaUsuario GetById(string usuario, int categoria)
        {
            var cat = new CategoriaUsuarioManagement();
            CategoriaUsuario cc = new CategoriaUsuario { IdCategoria = categoria, IdUsuario = usuario };
            return cat.RetrieveById(cc);
        }


        [HttpPost]
        public IActionResult Create(CategoriaUsuario cc)
        {
            try
            {
                var cat = new CategoriaUsuarioManagement();
                cat.Create(cc);
                return Ok(new { msg = "Se agregó la categoria al usuario" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete]
        public IActionResult Delete(CategoriaUsuario cc)
        {
            try
            {
                var cat = new CategoriaUsuarioManagement();
                cat.Delete(cc);

                return Ok(new { msg = "Se removió la categoria del usuario" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{usuario}")]
        public IActionResult DeleteAll(string usuario)
        {
            try
            {
                var cat = new CategoriaUsuarioManagement();
                cat.DeleteAll(new CategoriaUsuario { IdUsuario = usuario });

                return Ok(new { msg = "Se removieron todas las categorías al comercio" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
