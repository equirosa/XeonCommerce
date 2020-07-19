using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Rol:BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("rol")]
        public string rol { get; set; }
        [JsonPropertyName("descripcion")]
        public string Descripcion { get; set; }

        public Rol() { }
    }
}
