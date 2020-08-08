using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class RolVista : BaseEntity
    {
        [JsonPropertyName("idRol")]
        public int IdRol { get; set; }

        [JsonPropertyName("idVista")]
        public int IdVista { get; set; }

        public RolVista() { }
    }

    
}
