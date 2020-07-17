using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Comercio
    {
        [JsonPropertyName("cedJuridica")]
        public string CedJuridica { get; set; }
        [JsonPropertyName("nombreComercial")]
        public string NombreComercial { get; set; }
        [JsonPropertyName("correoElectronico")]
        public string CorreoElectronico { get; set; }
        [JsonPropertyName("telefono")]
        public string Telefono { get; set; }
        [JsonPropertyName("direccion")]
        public int Direccion { get; set; }

        public Comercio() { }
    }
}
