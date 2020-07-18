﻿using System;
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
    public class ContrasennaController : ControllerBase
    {

        [HttpGet]
        public List<Contrasenna> Get()
        {
            var cm = new ContrasennaManagement();
            return cm.RetrieveAll();
        }
        [HttpGet("{id}")]
        public Contrasenna GetById(int id)
        {
            var cm = new ContrasennaManagement();
            Contrasenna contrasenna = new Contrasenna();
            contrasenna.Id = id;
            return cm.RetrieveById(contrasenna);
        }


        [HttpPost]
        public IActionResult Create(Contrasenna contrasenna)
        {
            try
            {
                var cm = new ContrasennaManagement();
                cm.Create(contrasenna);
                return Ok("Se creó el contraseña");
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
        [HttpPut("{id}")]
        public IActionResult Update(Contrasenna contrasenna, int id)
        {
            try
            {
                var cm = new ContrasennaManagement();
                contrasenna.Id = id;
                if (GetById(id) != null)
                {
                    cm.Update(contrasenna);
                    return Ok("Se actualizó el contraseña");
                }
                else
                {
                    return StatusCode(500);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var cm = new ContrasennaManagement();
                var contrasenna = new Contrasenna { Id = id };
                cm.Delete(contrasenna);

                return Ok("Se eliminó el contraseña");

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
