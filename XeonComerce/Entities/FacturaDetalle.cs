using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class FacturaDetalle : BaseEntity
    {
        [JsonPropertyName("idLinea")]
        public int IdLinea { get; set; }
        [JsonPropertyName("idProducto")]
        public int IdProducto { get; set; }
        [JsonPropertyName("valor")]
        public double Valor { get; set; }
        [JsonPropertyName("descuento")]
        public double Descuento { get; set; }
        [JsonPropertyName("cantidad")]
        public int Cantidad { get; set; }
        [JsonPropertyName("iva")]
        public int IVA { get; set; }
        [JsonPropertyName("idFactura")]
        public int IdFactura { get; set; }
        [JsonPropertyName("totalLinea")]
        public double TotalLinea { get; set; }
        public FacturaDetalle() { }

    }
}
