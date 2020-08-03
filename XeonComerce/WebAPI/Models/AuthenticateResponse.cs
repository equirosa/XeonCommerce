using Entities;
using System;

namespace WebApi.Models
{
    public class AuthenticateResponse
    {
        public string Id { get; set; }
        public string Nombre { get; set; }
        public string ApellidoUno { get; set; }
        public string ApellidoDos { get; set; }
        public string Genero { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string CorreoElectronico { get; set; }
        public string NumeroTelefono { get; set; }
        public int IdDireccion { get; set; }
        public string Estado { get; set; }
        public string Tipo { get; set; }
        public string Token { get; set; }




        public AuthenticateResponse(Usuario usuario, string token)
        {
            Id = usuario.Id;
            Nombre = usuario.Nombre;
            ApellidoUno = usuario.ApellidoUno;
            ApellidoDos = usuario.ApellidoDos;
            Genero = usuario.Genero;
            FechaNacimiento = usuario.FechaNacimiento;
            CorreoElectronico = usuario.CorreoElectronico;
            NumeroTelefono = usuario.NumeroTelefono;
            IdDireccion = usuario.IdDireccion;
            Estado = usuario.Estado;
            Tipo = usuario.Tipo;
            Token = token;
        }
    }
}