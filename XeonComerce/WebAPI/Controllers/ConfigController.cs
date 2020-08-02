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
    public class ConfigController : ControllerBase
    {

        [HttpGet]
        public List<Config> Get()
        {
            var conf = new ConfigManagement();
            return conf.RetrieveAll();
        }
        [HttpGet("{id}")]
        public Config GetById(string id)
        {
            var conf = new ConfigManagement();
            Config config = new Config();
            config.Id = id;
            return conf.RetrieveById(config);
        }


        [HttpPost]
        public IActionResult Create(Config config)
        {
            try
            {
                var conf = new ConfigManagement();
                conf.Create(config);
                return Ok("Se creó la config");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
        [HttpPut("{id}")]
        public IActionResult Update(Config config, string id)
        {
            try
            {
                var conf = new ConfigManagement();
                config.Id = id;
                if (GetById(id) != null)
                {
                    conf.Update(config);
                    return Ok("Se actualizó la configuración!");
                }
                else
                {
                    return StatusCode(500, new { msg = "No se encontró dicha configuración..." });
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
                var conf = new ConfigManagement();
                var config = new Config { Id = id };
                conf.Delete(config);

                return Ok("Se eliminó la configuracion.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
