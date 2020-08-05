using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Vista: BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("url")]
        public string URL { get; set; }

        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }



        public Vista() { }
    }
}
