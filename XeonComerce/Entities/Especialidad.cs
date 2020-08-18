using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Especialidad : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("idRol")]
        public int IdRol { get; set; }

        [JsonPropertyName("idServicio")]
        public int IdServicio { get; set; }


        public Especialidad() { }
    }
}
