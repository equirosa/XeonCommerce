using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class PdfXml : BaseEntity
    {
        [JsonPropertyName("html")]
        public string Html { get; set; }
        
        [JsonPropertyName("xml")]
        public string XML { get; set; }

        public PdfXml() { }

    }
}
