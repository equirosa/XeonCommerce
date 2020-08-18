using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Management;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

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


        [HttpPost("enviar/{id}")]
        public ActionResult Correo(string id, Producto producto)
        {
            try
            {
                UsuarioManagement um = new UsuarioManagement();
                ComercioManagement cm = new ComercioManagement();
                Usuario us = um.RetrieveById(new Usuario { Id = id });
                Comercio com = cm.RetrieveById(new Comercio { CedJuridica = producto.IdComercio });
                if(us != null)
                {
                    if (com != null)
                    {
                        Execute(us, producto, com).Wait();
                    }
                    else
                    {
                        throw new Exception("El comercio no se encontró");
                    }
                }
                else
                {
                    throw new Exception("El usuario no se encontró");
                }
                return Ok(new { msg = "Se envió con éxito" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        private static async Task Execute(Usuario user, Producto prod, Comercio com)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("brutchm@ucenfotec.ac.cr", "GetItSafely");
            var to = new EmailAddress(user.CorreoElectronico.ToString(), user.Nombre.ToString());
            var plainTextContent = "";
            var htmlContent = "";
            var subject = "";
            if (prod.Tipo == 1)
            {
                subject = "Un producto que te podría interesar está en descuento";
                plainTextContent = ($"El producto {prod.Nombre} del comercio {com.NombreComercial} está en descuento. Ahora está en ₡{String.Format("{0:n}", prod.Precio - prod.Descuento)}, antes: ₡{String.Format("{0:n}", prod.Precio)}");
                htmlContent = $"<strong>El producto {prod.Nombre} del comercio {com.NombreComercial} está en descuento. </strong> Ahora está en ₡{String.Format("{0:n}", prod.Precio - prod.Descuento)}, antes: ₡{String.Format("{0:n}", prod.Precio)}";
            }
            else
            {
                subject = "Un servicio que te podría interesar está en descuento";
                plainTextContent = ($"El servicio {prod.Nombre} del comercio {com.NombreComercial} está en descuento. Ahora está en ₡{String.Format("{0:n}", prod.Precio - prod.Descuento)}, antes: ₡{String.Format("{0:n}", prod.Precio)}");
                htmlContent = $"<strong>El servicio {prod.Nombre} del comercio {com.NombreComercial} está en descuento. </strong> Ahora está en ₡{String.Format("{0:n}", prod.Precio - prod.Descuento)}, antes: ₡{String.Format("{0:n}", prod.Precio)}";
            }

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
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
