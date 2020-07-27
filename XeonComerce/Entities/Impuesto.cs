using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Impuesto : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }
        [JsonPropertyName("valor")]
        public int Valor { get; set; }

        public Impuesto()
        {
                
        }
    }
}
