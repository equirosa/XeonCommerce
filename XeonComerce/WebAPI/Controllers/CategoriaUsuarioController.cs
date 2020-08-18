#region libraries
using System;
using System.Collections.Generic;
using AppCore;
using Entities;
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

        [HttpDelete("{usuario}/{categoria}")]
        public IActionResult Delete(string usuario, int categoria)
        {
            try
            {
                var cat = new CategoriaUsuarioManagement();
                CategoriaUsuario catUsuario = new CategoriaUsuario { IdCategoria = categoria, IdUsuario = usuario };
                cat.Delete(catUsuario);

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
