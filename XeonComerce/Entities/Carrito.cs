using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Carrito : BaseEntity
    {
        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }
        [JsonPropertyName("idProducto")]
        public int IdProducto { get; set; }
        [JsonPropertyName("cantidad")]
        public int Cantidad { get; set; }
        public Carrito() { }

    }
}
