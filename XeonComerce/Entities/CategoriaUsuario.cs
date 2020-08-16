#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
#endregion


namespace Entities
{
    public class CategoriaUsuario : BaseEntity
    {
        #region properties
        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }
        [JsonPropertyName("idCategoria")]
        public int IdCategoria { get; set; }
        #endregion

        #region constructor
        public CategoriaUsuario() { }
        #endregion

    }
}