using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Cupon
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }
        [JsonPropertyName("fechaExpiracion")]
        public DateTime FechaExpiracion { get; set; }
        [JsonPropertyName("valor")]
        public int Valor { get; set; }

        public Cupon() { }

    }
}
