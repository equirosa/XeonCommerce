using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Bitacora : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("fecha")]
        public DateTime Fecha { get; set; }
        [JsonPropertyName("detalle")]
        public string Detalle { get; set; }
        [JsonPropertyName("accion")]
        public string Accion { get; set; }
        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }

        public Bitacora() { }
    }
}
