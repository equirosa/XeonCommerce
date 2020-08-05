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
    [Route("api/productosyservicios")]
    [ApiController]
    public class ProductoServicioController : ControllerBase
    {
        [HttpGet("{tipo}")]
        public ActionResult Get(int tipo)
        {
            try
            {
                var prodAndServMng = new ProductoServicioManagement();

                if (tipo == 1)
                {
                    return Ok(prodAndServMng.RetrieveAllProductos());
                }
                else
                {
                    return Ok(prodAndServMng.RetrieveAllServicios());
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpGet("{id}/{tipo}")]
        public ActionResult GetById(int id, int tipo)
        {
            try
            {
                var prodAndServMng = new ProductoServicioManagement();
                if (id < 1)
                {
                    return NotFound();
                }
                else
                {
                    if (tipo == 1)
                    {
                        Producto producto = new Producto();
                        producto.Id = id;
                        producto.Tipo = tipo;
                        return Ok(prodAndServMng.RetrieveByIdProducto(producto));
                    }
                    else
                    {
                        Servicio servicio = new Servicio();
                        servicio.Id = id;
                        servicio.Tipo = tipo;
                        return Ok(prodAndServMng.RetrieveByIdServicio(servicio));
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult Post(Producto producto)
        {
            try
            {
                var prodMng = new ProductoServicioManagement();
                prodMng.Create(producto);

                return Ok(new { msg = "Se registro con exito"});

                //Ir a la base de datos para crear el cupon y obtener el Id.
                //Se decide utilizar Producto de manera generica para productos y servicios.
                // return CreatedAtAction(nameof(GetProductoById), new { id = producto.Id }, producto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, Producto producto)
        {
            try
            {
                var prodAndServ = new ProductoServicioManagement();
                producto.Id = id;
                //Validar que el objeto exista en la base de datos, ProductoServicioManagement GetProductoById
                //Se decide utilizar Producto de manera generica para productos y servicios.
                if (GetById(id, producto.Tipo) == null)
                {
                    return BadRequest();
                }
                else
                {
                    prodAndServ.Update(producto);
                    return Ok(new { msg = "Se actualizó con exito" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var prodAndServ = new ProductoServicioManagement();
                var producto = new Producto { Id = id };
                prodAndServ.Delete(producto);

                return Ok(new { msg = "Se ha eliminado" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
