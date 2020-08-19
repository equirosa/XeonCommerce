using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class CitaProducto: BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("horaInicio")]
        public DateTime HoraInicio { get; set; }

        [JsonPropertyName("horaFinal")]
        public DateTime HoraFinal { get; set; }

        [JsonPropertyName("estado")]
        public string Estado { get; set; }

        [JsonPropertyName("tipo")]
        public string Tipo { get; set; }

        [JsonPropertyName("idEmpleado")]
        public int IdEmpleado { get; set; }

        [JsonPropertyName("idFactura")]
        public int IdFactura { get; set; }

        [JsonPropertyName("idCliente")]
        public string IdCliente { get; set; }       

        [JsonPropertyName("idSucursal")]
        public string IdSucursal { get; set; }

        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }

        [JsonPropertyName("productos")]
        public Producto[] Productos { get; set; }

        public CitaProducto() { }

    }
}
