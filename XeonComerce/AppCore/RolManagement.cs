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

        public RolManagement()
        {
            crud = new RolCrudFactory();
        }

        public void Create(Rol obj)
        {
            crud.Create(obj);
        }

        public List<Rol> RetriveAll()
        {
            return crud.RetrieveAll<Rol>();
        }

        public Rol RetriveById(Rol obj)
        {
            return crud.Retrieve<Rol>(obj);
        }

        public void Update(Rol obj)
        {
            crud.Update(obj);
        }

        public void Delete(Rol obj)
        {
            crud.Delete(obj);
        }
    }
}
