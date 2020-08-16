using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class FacturaMaestro : BaseEntity
    {
        [JsonPropertyName("idFactura")]
        public int IdFactura { get; set; }
        [JsonPropertyName("idTransaccion")]
        public int IdTransaccion { get; set; }
        [JsonPropertyName("fecha")]
        public DateTime Fecha { get; set; }
        [JsonPropertyName("cedulaJuridica")]
        public string CedulaJuridica { get; set; }
        [JsonPropertyName("idCliente")]
        public string IdCliente { get; set; }
        public FacturaMaestro() { }

    }
}
