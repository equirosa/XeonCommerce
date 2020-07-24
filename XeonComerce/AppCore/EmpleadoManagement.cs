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

        //public void Create(Empleado empleado)
        //{
        //    var empleadoComercioSucursal = new EmpleadoComercioSucursal()
        //    {
        //        IdUsuario = empleado.Id,
        //        IdComercio = empleado.IdComercio,
        //        IdSucursal = empleado.IdSucursal
        //    };

        //    crudEmpleadoComercioSucursal.Create(empleadoComercioSucursal);
        //}

        public void Create(EmpleadoComercioSucursal empleadoComercioSucursal)
        {
            crudEmpleadoComercioSucursal.Create(empleadoComercioSucursal);
        }


        public List<Empleado> GetEmpleadosByIdSucursal(string idSucursal)
        {
            return crudEmpleadoComercioSucursal.GetEmpleadosByIdSucursal<Empleado>(idSucursal);
        }


        public string VerificarUsuario(string idUsuario)
        {
            Usuario u = new Usuario();
            u.Id = idUsuario;

            var usuario = crudUsuario.Retrieve<Usuario>(u);
            var e = this.verificarEmpleadoComercioSucursal(idUsuario);

            if( usuario != null && e)
            {
                return idUsuario; 
            }

            return null;

        }

        private bool verificarEmpleadoComercioSucursal(string idUsuario)
        {
            var empleados = crudEmpleadoComercioSucursal.RetrieveAll<EmpleadoComercioSucursal>();

            foreach( var e in empleados)
            {
                if(e.IdUsuario == idUsuario)
                {
                    return false; 
                }
            }

            return true;
        }

        public void Delete(int idEmpleado)
        {
            var empleadoComercioSucursal = new EmpleadoComercioSucursal();
            empleadoComercioSucursal.Id = idEmpleado;

            crudEmpleadoComercioSucursal.Delete(empleadoComercioSucursal);
        }




    }
}
