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
    public class ListaValorController : ControllerBase
    {
        private ListaValorManagement lm = new ListaValorManagement();

        [HttpGet]
        public List<ListaValor>RetriveAll()
        {
            return lm.RetriveAll();
        }
    }
}