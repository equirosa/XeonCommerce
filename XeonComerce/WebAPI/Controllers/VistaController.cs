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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VistaController : ControllerBase
    {
        private VistaManagement vm = new VistaManagement();
        [HttpGet]
        public List<Vista> RetriveAll()
        {
            return vm.RetriveAll();
        }


        [HttpGet]
        public Vista RetriveById(string id)
        {
            var vista = new Vista()
            {
                Id = Int32.Parse(id)
            };
            return vm.RetriveById(vista);
        }

        
    }
}
