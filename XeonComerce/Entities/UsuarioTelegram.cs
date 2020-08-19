using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class UsuarioTelegram : BaseEntity
    {
        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }
        [JsonPropertyName("idChat")]
        public string IdChat { get; set; }

        public UsuarioTelegram() { }
    }
}
