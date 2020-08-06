using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Ausencias: BaseEntity
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("valor")]
        public int Valor { get; set; }

        public Ausencias() { }
    }
}
