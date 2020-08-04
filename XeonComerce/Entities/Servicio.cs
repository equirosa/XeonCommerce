using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Servicio : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("tipo")]
        public int Tipo { get; set; }
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }
        [JsonPropertyName("precio")]
        public Double Precio { get; set; }
        [JsonPropertyName("descuento")]
        public Double Descuento { get; set; }
        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }
        [JsonPropertyName("duracion")]
        public int Duracion { get; set; }
        [JsonPropertyName("impuesto")]
        public int Impuesto { get; set; }

        public Servicio() { }
    }
}
