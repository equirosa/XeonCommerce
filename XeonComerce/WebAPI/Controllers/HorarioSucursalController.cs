using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HorarioSucursalController : ControllerBase
    {
             
            [HttpGet]
            public List<HorarioSucursal> RetrieveAll()
            {
                var horarioSucursalManag = new HorarioSucursalManagement();
                return horarioSucursalManag.RetrieveAll();
            }


            [HttpGet]
            public HorarioSucursal RetrieveById(int id)
            {
                var horarioSucursalManag = new HorarioSucursalManagement();

                var horarioSucursal = new HorarioSucursal()
                {
                    Id = id
                };

                return horarioSucursalManag.RetrieveById(horarioSucursal);

            }

            [HttpPost]
            public IActionResult Create(HorarioSucursal horarioSucursal)
            {
                try
                {
                    var horarioSucursalManag = new HorarioSucursalManagement();

                    horarioSucursalManag.Create(horarioSucursal);

                    return Ok();


                }
                catch (Exception ex)
                {
                    
                    return StatusCode(500, ex);
                }
            }

            [HttpPut]
            public IActionResult Update(HorarioSucursal horarioSucursal)
            {
                try
                {
                    var horarioSucursalManag = new HorarioSucursalManagement();

                    horarioSucursalManag.Update(horarioSucursal);

                    return Ok();


                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex);
                }
            }

            [HttpDelete]
            public IActionResult Delete(int id)
            {
                var horarioSucursal = new HorarioSucursal();
                horarioSucursal.Id = id;

                try
                {
                    var horarioSucursalManag = new HorarioSucursalManagement();

                    horarioSucursalManag.Delete(horarioSucursal);

                    return Ok();


                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex);
                }
            }
        }
}
