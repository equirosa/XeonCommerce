using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class DiaFeriado : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("fecha")]
        public DateTime Fecha { get; set; }
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }
        [JsonPropertyName("descripcion")]
        public string Descripcion { get; set; }

        public DiaFeriado() { }

    }
}
