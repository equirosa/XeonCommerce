using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Management;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SelectPdf;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {

    [HttpPost]
        public IActionResult GeneratePDF(Pdf pdfDto)
        {
            try
            {
                string html = (pdfDto.Html);
                if (html == null) throw new Exception("HTML not found");
                HtmlToPdf oHtmlToPdf = new HtmlToPdf();
                PdfDocument oPdfDocument = oHtmlToPdf.ConvertHtmlString(html);
                byte[] pdf = oPdfDocument.Save();
                oPdfDocument.Close();
                return File(pdf, "application/pdf", $"{pdfDto.Nombre}.pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = ex.Message });
            }
        }
    }
}
