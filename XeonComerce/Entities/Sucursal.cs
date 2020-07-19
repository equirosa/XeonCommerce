using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Sucursal: BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idDireccion")]
        public int IdDireccion { get; set; }
        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }

        public Sucursal() { }
    }
}
