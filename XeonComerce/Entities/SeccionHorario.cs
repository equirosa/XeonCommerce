using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class SeccionHorario
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idHorarioEmpleado")]
        public int IdHorarioEmpleado { get; set; }
        [JsonPropertyName("horaInicio")]
        public int HoraInicio { get; set; }
        [JsonPropertyName("horaFinal")]
        public int HoraFinal { get; set; }
        [JsonPropertyName("descripcion")]
        public string Descripcion { get; set; }
        [JsonPropertyName("tipo")]
        public int Tipo { get; set; }
        [JsonPropertyName("fecha")]
        public DateTime Fecha { get; set; }

        public SeccionHorario() { }
    }
}
