using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Sucursal : BaseEntity
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("idDireccion")]
        public int IdDireccion { get; set; }
        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }
        [JsonPropertyName("disposiciones")]
        public string Disposiciones { get; set; }
        [JsonPropertyName("estado")]
        public string Estado { get; set; }

        public Sucursal() { }
    }
}
