using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class SeccionHorario : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idHorarioEmpleado")]
        public int IdHorarioEmpleado { get; set; }
        [JsonPropertyName("horaInicio")]
        public DateTime HoraInicio { get; set; }
        [JsonPropertyName("horaFinal")]
        public DateTime HoraFinal { get; set; }
        [JsonPropertyName("descripcion")]
        public string Descripcion { get; set; }
        [JsonPropertyName("tipo")]
        public int Tipo { get; set; }
       

        public SeccionHorario() { }

        public SeccionHorario(string [] infoArray)
        {
            if(infoArray != null && infoArray.Length >= 6)
            {
                var id = 0;
                if (Int32.TryParse(infoArray[0], out id))
                    Id = id;
                else
                    throw new Exception("Id debe de ser un numero");

                var idHorarioEmpleado = 0;
                if (Int32.TryParse(infoArray[1], out idHorarioEmpleado))
                    IdHorarioEmpleado = idHorarioEmpleado;
                else
                    throw new Exception("IdHorarioEmpleado debe de ser un numero");

                HoraInicio = DateTime.Parse(infoArray[2]);
                HoraFinal = DateTime.Parse(infoArray[3]);
                Descripcion = infoArray[4];
                var tipo = 0;
                if (Int32.TryParse(infoArray[5], out tipo))
                    Tipo = tipo;
                else
                    throw new Exception("Tipo debe de ser un numero");
            }
            else
            {
                throw new Exception("Los valores [id,idHorarioEmpeado,horaInicio,horaFinal,descripcion]");
            }

        }

    }
}
