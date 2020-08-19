using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class ListaDeseos : BaseEntity
    {

        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }
        [JsonPropertyName("idProducto")]
        public int IdProducto { get; set; }
        [JsonPropertyName("cantidad")]
        public int Cantidad { get; set; }
        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }

        public ListaDeseos() { }

    }
}