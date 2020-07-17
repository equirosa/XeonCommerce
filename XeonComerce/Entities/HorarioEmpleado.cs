﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class HorarioEmpleado
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("idEmpleadoComercioSucursal")]
        public int IdEmpleadoComercioSucursal { get; set; }
        [JsonPropertyName("horaInicio")]
        public int HoraInicio { get; set; }
        [JsonPropertyName("horaFinal")]
        public int HoraFinal { get; set; }
        [JsonPropertyName("diaSemana")]
        public int DiaSemana { get; set; }

        public HorarioEmpleado() { }
    }
}