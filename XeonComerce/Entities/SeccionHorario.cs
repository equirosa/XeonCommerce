using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class SeccionHorario: BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("idEmpleado")]
        public int IdEmpleado { get; set; }

        [JsonPropertyName("horaInicio")]
        public DateTime HoraInicio { get; set; }

        [JsonPropertyName("horaFinal")]
        public DateTime HoraFinal { get; set; }

        [JsonPropertyName("diaSemana")]
        public int DiaSemana { get; set; }

        [JsonPropertyName("descripcion")]
        public string Descripcion { get; set; }

        [JsonPropertyName("estado")]
        public string Estado { get; set; }


        public SeccionHorario() { }
    }
}
