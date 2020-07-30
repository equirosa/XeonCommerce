using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Categoria : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("valor")]
        public string Valor { get; set; }

        [JsonPropertyName("descripcion")]
        public string Descripcion { get; set; }

        public Categoria() { }
    }
}
