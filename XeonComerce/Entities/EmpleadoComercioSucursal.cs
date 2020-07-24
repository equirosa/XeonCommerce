using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class EmpleadoComercioSucursal : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }

        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }

        [JsonPropertyName("idSucursal")]
        public string IdSucursal { get; set; }

        [JsonPropertyName("estado")]
        public string Estado { get; set; }

        public EmpleadoComercioSucursal() { }

    }
}



