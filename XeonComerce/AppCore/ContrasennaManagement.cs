
using DataAccessLayer.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace Management
{
    public class ContrasennaManagement
    {
        private ContrasennaCrudFactory crud;

        public ContrasennaManagement()
        {
            crud = new ContrasennaCrudFactory();
        }

        public void Create(Contrasenna ent)
        {
         crud.Create(ent);
        }

        public List<Contrasenna> RetrieveAll()
        {
            return crud.RetrieveAll<Contrasenna>();
        }

        public Contrasenna RetrieveById(Contrasenna ent)
        {
            return crud.Retrieve<Contrasenna>(ent);
        }

        public void Update(Contrasenna ent)
        {
                crud.Update(ent);
           
        }

        public void Delete(Contrasenna ent)
        {
            crud.Delete(ent);
        }
    }
}
