using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Cita : BaseEntity
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

        [JsonPropertyName("idCliente")]
        public string IdCliente { get; set; }

        [JsonPropertyName("idEmpleadoComercioSucursal")]
        public int IdEmpleadoComercioSucursal { get; set; }

        [JsonPropertyName("idFactura")]
        public int IdFactura { get; set; }

        [JsonPropertyName("idsucrusal")]
        public string IdSucursal { get; set; }

        [JsonPropertyName("idComercio")]
        public string IdComercio { get; set; }




        public Cita() { }
    }
}
