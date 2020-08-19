using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Calificaciones : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("calificacion")]
        public int Calificacion { get; set; }
        [JsonPropertyName("idProducto")]
        public int IdProducto { get; set; }
        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }


        public Calificaciones() { }

    }
}