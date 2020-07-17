using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Contrasenna
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("contrasenna")]
        public string contrasenna { get; set; }
        [JsonPropertyName("estado")]
        public string estado { get; set; }
        [JsonPropertyName("fechaActualizacion")]
        public DateTime FechaActualizacion { get; set; }
        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }

        public Contrasenna() { }
    }
}
