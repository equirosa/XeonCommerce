using AppCore;
using Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarritoController : ControllerBase
    {
        private CarritoManagement am = new CarritoManagement();

        [HttpGet("{ced}")]
        public List<Carrito> RetriveAll(string ced)
        {
            return am.RetriveAll(new Carrito { IdUsuario=ced });
        }

        [HttpGet("{ced}/{id}")]
        public Carrito RetriveById(string ced, int id)
        {
            return am.RetriveById(new Carrito { IdUsuario=ced, IdProducto = id});
        }

        [HttpPost]
        public IActionResult Create (Carrito a)
        {
            try
            {
                if (a.Cantidad <= 0) throw new Exception("La cantidad no puede ser menor a 0");
                List<Carrito> lst = am.RetriveAll(a);
                ProductoServicioManagement pm = new ProductoServicioManagement();
                Producto p2 = pm.RetrieveByIdProducto(new Producto { Id = a.IdProducto });
                var b = lst.Find((i)=>i.IdUsuario == a.IdUsuario);

                if (p2 != null) { 
                    if (a.Cantidad > p2.Cantidad) throw new Exception("No existen tantas unidades de dicho producto");
                }
                else
                    throw new Exception("No existe dicho producto");

                if (b != null)
                {
                    Producto p1 = pm.RetrieveByIdProducto(new Producto { Id = b.IdProducto });
                    if (p1 != null && p2 != null)
                    {
                        if (p1.IdComercio != p2.IdComercio) throw new Exception("¡No se puede agregar productos de diferentes comercios al mismo tiempo!");
                    }
                }
                var c = lst.Find((i) => i.IdProducto == a.IdProducto);
                if (c != null) throw new Exception("Ya existe dicho producto en el carrito");
                am.Create(a);
                return Ok(new { msg = "Se agregó el producto al carrito" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg=e.Message });
            }
        }

        [HttpPut]
        public IActionResult Update(Carrito a)
        {
            try
            {
                if (a.Cantidad <= 0) throw new Exception("La cantidad no puede ser menor a 0");
                ProductoServicioManagement pm = new ProductoServicioManagement();
                Producto p2 = pm.RetrieveByIdProducto(new Producto { Id = a.IdProducto });
                if (p2 != null)
                {
                    if (a.Cantidad > p2.Cantidad) throw new Exception("No existen tantas unidades de dicho producto");
                }
                else
                {
                    throw new Exception("No existe dicho producto");
                }
                am.Update(a);
                return Ok(new { msg = "Se actualizó el producto al carrito" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }

        [HttpDelete]
        public IActionResult Delete(Carrito car)
        {
            try
            {
                am.Delete(car);
                return Ok(new { msg = "Se eliminó el producto al carrito" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteAll(string id)
        {
            try
            {
                am.DeleteAll(new Carrito { IdUsuario=id});
                return Ok(new { msg = "Se limpió el carrito" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { msg = e.Message });
            }
        }
    }
}
