using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class TranFin : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("monto")]
        public double Monto { get; set; }
        [JsonPropertyName("metodo")]
        public string Metodo { get; set; }
        [JsonPropertyName("idCliente")]
        public string idCliente { get; set; }
        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }
        [JsonPropertyName("fecha")]
        public DateTime Fecha { get; set; }
        [JsonPropertyName("estado")]
        public string Estado { get; set; }
        public TranFin() { }

    }
}
