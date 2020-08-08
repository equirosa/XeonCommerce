using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class EmpleadoManagement
    {
        private UsuarioCrudFactory crudUsuario;
        private EmpleadoComercioSucursalCrudFactory crudEmpleadoComercioSucursal; 

        public EmpleadoManagement()
        {
            crudUsuario = new UsuarioCrudFactory();
            crudEmpleadoComercioSucursal = new EmpleadoComercioSucursalCrudFactory();
        }
            
        public void Create(EmpleadoComercioSucursal empleadoComercioSucursal)
        {
            crudEmpleadoComercioSucursal.Create(empleadoComercioSucursal);
        }


        public List<Empleado> GetEmpleadosByIdSucursal(string idSucursal)
        {
            return crudEmpleadoComercioSucursal.GetEmpleadosByIdSucursal<Empleado>(idSucursal);
        }


        public bool VerificarUsuario(string idUsuario)
        {
            Usuario u = new Usuario();
            u.Id = idUsuario;

            var usuario = crudUsuario.Retrieve<Usuario>(u);
            //var e = this.verificarEmpleadoComercioSucursal(idUsuario);

            //if( usuario != null && e)
            //{
            //    return idUsuario; 
            //}

            //return null;

            if( usuario != null)
            {
                return true;
            }

            return false;
        }

        public bool verificarEmpleadoComercioSucursal(string idUsuario)
        {
            var empleados = crudEmpleadoComercioSucursal.RetrieveAll<EmpleadoComercioSucursal>();

            foreach( var e in empleados)
            {
                if(e.IdUsuario == idUsuario && e.Estado == "A")
                {
                    return false; 
                }
            }

            return true;
        }

        public void Delete(int idEmpleado)
        {
          
            var empleadoComercioSucursal = crudEmpleadoComercioSucursal.Retrieve<EmpleadoComercioSucursal>(new EmpleadoComercioSucursal { Id = idEmpleado });
            Usuario usuario = crudUsuario.Retrieve<Usuario>(new Usuario { Id = empleadoComercioSucursal.IdUsuario });
            usuario.Tipo = "U";

            crudEmpleadoComercioSucursal.Delete(empleadoComercioSucursal);
            crudUsuario.Update(usuario);
        }

        public void Update(EmpleadoComercioSucursal empleado)
        {
            crudEmpleadoComercioSucursal.Update(empleado);
        }


        public List<EmpleadoComercioSucursal> RetrieveAll()
        {
            return crudEmpleadoComercioSucursal.RetrieveAll<EmpleadoComercioSucursal>();            
        }


    }
}
