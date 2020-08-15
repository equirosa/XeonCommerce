using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCoder;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class QRCodeController : ControllerBase
    {
        [HttpPost]
        public void GenerarQR(string id)
        {
            var cm = new CitaManagement();

            Cita cita = new Cita();
            cita.Id = Int32.Parse(id);
            cita = cm.RetriveById(cita);

            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(cita.ToString(), QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(20);


            //la persona encargada de enviar los correos puede llamar a este metood o agregar la logica del envío por acá
        }
    }
}