using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class ListaValor:BaseEntity
    {
        [JsonPropertyName("idLista")]
        public int IdLista { get; set; }
        [JsonPropertyName("idValor")]
        public int IdValor { get; set; }
        [JsonPropertyName("valor")]
        public string valor { get; set; }

        public ListaValor() { }
    }
}
