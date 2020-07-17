using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Direccion
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("provincia")]
        public int Provincia { get; set; }
        [JsonPropertyName("canton")]
        public int Canton { get; set; }
        [JsonPropertyName("distrito")]
        public int Distrito { get; set; }
        [JsonPropertyName("sennas")]
        public string Sennas { get; set; }
        [JsonPropertyName("latitud")]
        public string Latitud { get; set; }
        [JsonPropertyName("longitud")]
        public string Longitud { get; set; }

        public Direccion() { }

    }
}
