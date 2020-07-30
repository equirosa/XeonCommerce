using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class CategoriaComercio : BaseEntity
    {
        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }
        [JsonPropertyName("idCategoria")]
        public int IdCategoria { get; set; }

        public CategoriaComercio() { }
    }
}
