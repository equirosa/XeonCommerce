using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;


namespace Entities
{
    public class ProductoCita : BaseEntity
    {
        [JsonPropertyName("idCita")]
        public int IdCita { get; set; }

        [JsonPropertyName("idProducto")]
        public int IdProducto { get; set; }

        [JsonPropertyName("cantidad")]
        public int Cantidad { get; set; }

        public ProductoCita() {}
    }
}
