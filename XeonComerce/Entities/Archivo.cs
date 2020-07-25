using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Archivo : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("link")]
        public string Link { get; set; }
        [JsonPropertyName("tipo")]
        public string Tipo { get; set; }
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }
        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }

        public Archivo() { }

    }
}
