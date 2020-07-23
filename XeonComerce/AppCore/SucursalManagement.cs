using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class SucursalManagement
    {
        private SucursalCrudFactory crud;

        public SucursalManagement()
        {
            crud = new SucursalCrudFactory();
        }
        public void Create(Sucursal obj)
        {
            crud.Create(obj);
        }

        public List<Sucursal> RetriveAll()
        {
            return crud.RetrieveAll<Sucursal>();
        }

        public Sucursal RetriveById(Sucursal obj)
        {
            return crud.Retrieve<Sucursal>(obj);
        }

        public void Update(Sucursal obj)
        {
            crud.Update(obj);
        }

        public void Delete(Sucursal obj)
        {
            crud.Delete(obj);
        }
    }
}
