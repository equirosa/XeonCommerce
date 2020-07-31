using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class VistaRol
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }

        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }

        [JsonPropertyName("descripcion")]
        public string Descripcion { get; set; }

        [JsonPropertyName("vistas")]
        public Vista[] Vistas { get; set; }
        public VistaRol () { }


    }
}
