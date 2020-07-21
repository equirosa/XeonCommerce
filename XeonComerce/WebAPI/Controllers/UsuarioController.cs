﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            usuarioService = _usuarioService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _usuarioService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Cedula o contraseña son incorrectas" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet("test")]
        public IActionResult GetAll()
        {            return Ok("Tiene permisos");
        }




        [HttpGet]
        public List<Usuario> Get()
        {
            var cat = new UsuarioManagement();
            return cat.RetrieveAll();
        }

        [HttpGet("{id}")]
        public Usuario GetById(string id)
        {
            var cat = new UsuarioManagement();
            Usuario usuario = new Usuario();
            usuario.Id = id;
            return cat.RetrieveById(usuario);
        }


        [HttpPost]
        public IActionResult Create(Usuario usuario)
        {
            try
            {
                var cat = new UsuarioManagement();
                cat.Create(usuario);
                return Ok("Se creó el usuario");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
        [HttpPut("{id}")]
        public IActionResult Update(Usuario usuario, string id)
        {
            try
            {
                var cat = new UsuarioManagement();
                usuario.Id = id;
                if (GetById(id) != null)
                {
                    cat.Update(usuario);
                    return Ok("Se actualizó el usuario");
                }
                else
                {
                    return StatusCode(500, new { msg = "No se encontró dicho usuario" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var cat = new UsuarioManagement();
                var usuario = new Usuario { Id = id };
                cat.Delete(usuario);

                return Ok("Se eliminó el usuario");

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
