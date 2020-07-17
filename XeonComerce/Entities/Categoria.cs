using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Categoria
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("valor")]
        public string Valor { get; set; }

        public Categoria() { }
    }
}
