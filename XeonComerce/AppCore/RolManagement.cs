using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class RolManagement
    {
        private RolCrudFactory crud;
        private RolVistaCrudFactory crudRolVista;

        public RolManagement()
        {
            crud = new RolCrudFactory();
            crudRolVista = new RolVistaCrudFactory();
        }

        public void Create(VistaRol obj)
        {
            var rol = new Rol()
            {
                Id = 0,
                IdComercio = obj.IdComercio,
                Nombre = obj.Nombre,
                Descripcion = obj.Descripcion
            }; 
            crud.Create(rol);

            var rolUltimo = crud.GetUltimoRol<Rol>();

            this.CreateRolVistas(obj.Vistas, rolUltimo.Id);

        }

        private void CreateRolVistas(Vista[] vistas, int IdRol)
        {
            foreach( var v in vistas)
            {
                var rolVista = new RolVista()
                {
                    IdRol = IdRol,
                    IdVista = v.Id
                };

                crudRolVista.Create(rolVista);
            }
        }

        public List<Rol> RetriveAll()
        {
            return crud.RetrieveAll<Rol>();
        }

        public VistaRol RetriveById(Rol obj)
        {
            

            var rol = crud.Retrieve<Rol>(obj);
            var vistaRol = new VistaRol()
            {
                Id = rol.Id,
                IdComercio = rol.IdComercio,
                Nombre = rol.Nombre,
                Descripcion = rol.Descripcion,
                Vistas = new List<Vista>().ToArray()
             };

            return vistaRol;
        }

        public void Update(VistaRol vistaRol)
        {
            // Actualizar los datos propios del rol; nombre, descripcion
            var rol = new Rol()
            {
                Id = vistaRol.Id,
                IdComercio = vistaRol.IdComercio,
                Nombre = vistaRol.Nombre,
                Descripcion = vistaRol.Descripcion
            };
            crud.Update(rol);

            // Eliminar todas las rolVistas con el idRol 
            crudRolVista.DeleteByRol(vistaRol.Id);


            // Crear Todas las nuevas vistasRol
            this.CreateRolVistas(vistaRol.Vistas, vistaRol.Id);
        }
      

        public void Delete(Rol obj)
        {
            crudRolVista.DeleteByRol(obj.Id);
            crud.Delete(obj);
        }

              

        public List<Vista> GetVistasRol(int rol)
        {
            return crudRolVista.GetVistasRol<Vista>(rol);
        }

        public List<VistaRol> GetRolesComercio(string idComercio)
        {
            var resultado = new List<VistaRol>();

            var rolesComercio = crud.GetRolesByIdComercio<Rol>(idComercio);

            foreach( var rc in rolesComercio)
            {               
                var vistas = this.GetVistasRol(rc.Id);
                var vistaRol = new VistaRol()
                {
                    Id = rc.Id,
                    IdComercio = rc.IdComercio,
                    Nombre = rc.Nombre,
                    Descripcion = rc.Descripcion,
                    Vistas = vistas.ToArray()
                };

            resultado.Add(vistaRol);
            }

            return resultado;
        }
       
    }
}
