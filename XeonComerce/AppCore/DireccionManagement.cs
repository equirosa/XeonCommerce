using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class DireccionManagement
    {
        private DireccionCrudFactory crud;

        public DireccionManagement()
        {
            crud = new DireccionCrudFactory();
        }
        public void Create(Direccion obj)
        {
            crud.Create(obj);
        }

        public List<Direccion> RetriveAll()
        {
            return crud.RetrieveAll<Direccion>();
        }

        public Direccion RetriveById(Direccion obj)
        {
            return crud.Retrieve<Direccion>(obj);
        }

        public void Update(Direccion obj)
        {
            crud.Update(obj);
        }

        public void Delete(Direccion obj)
        {
            crud.Delete(obj);
        }
    }
}
