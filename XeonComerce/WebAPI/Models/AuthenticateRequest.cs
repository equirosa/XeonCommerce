using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class AuthenticateRequest
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Clave { get; set; }
    }
}