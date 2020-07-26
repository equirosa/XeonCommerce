using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class HorarioSucursal : BaseEntity
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idSucursal")]
        public string IdSucursal { get; set; }
        [JsonPropertyName("horaInicio")]
        public DateTime HoraInicio { get; set; }
        [JsonPropertyName("horaFinal")]
        public DateTime HoraFinal { get; set; }
        [JsonPropertyName("diaSemana")]
        public int DiaSemana { get; set; }

        public HorarioSucursal() { }

        public HorarioSucursal(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 5)
            {
                var id = 0;
                if (Int32.TryParse(infoArray[0], out id))
                    Id = id;
                else
                    throw new Exception("Id debe de ser un numero");

                IdSucursal = infoArray[1];
                HoraInicio = DateTime.Parse(infoArray[2]);
                HoraFinal = DateTime.Parse(infoArray[3]);
                
                var diaSemana = 0;
                if (Int32.TryParse(infoArray[4], out diaSemana))
                    DiaSemana = diaSemana;
                else
                    throw new Exception("DiaSemana debe de ser un numero");
            }
            else
            {
                throw new Exception("Los valores [id,idComercio,horaInicio,horaFinal,diaSemana]");
            }

        }
    }
}
