using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Pdf : BaseEntity
    {
        [JsonPropertyName("html")]
        public string Html { get; set; }
        
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }

        public Pdf() { }

    }
}
