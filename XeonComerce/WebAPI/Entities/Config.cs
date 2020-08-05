using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Config: BaseEntity
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("valor")]
        public double Valor { get; set; }

        public Config() { }

    }
}
