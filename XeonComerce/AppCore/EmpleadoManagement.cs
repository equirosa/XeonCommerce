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

        public void Create(Empleado empleado)
        {
            var empleadoComercioSucursal = new EmpleadoComercioSucursal()
            {
                IdUsuario = empleado.Id,
                IdComercio = empleado.IdComercio,
                IdSucursal = empleado.IdSucursal
            };

            crudEmpleadoComercioSucursal.Create(empleadoComercioSucursal);
        }


        public List<Empleado> GetEmpleadosByIdSucursal(string idSucursal)
        {
            return crudEmpleadoComercioSucursal.GetEmpleadosByIdSucursal<Empleado>(idSucursal);
        }







    }
}
