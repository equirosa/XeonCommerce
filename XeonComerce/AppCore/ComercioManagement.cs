
using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace Management
{
    public class ComercioManagement
    {
        private ComercioCrudFactory crud;

        public ComercioManagement()
        {
            crud = new ComercioCrudFactory();
        }

        public void Create(Comercio ent)
        {
         crud.Create(ent);
        }

        public List<Comercio> RetrieveAll()
        {
            return crud.RetrieveAll<Comercio>();
        }

        public Comercio RetrieveById(Comercio ent)
        {
            return crud.Retrieve<Comercio>(ent);
        }

        public void Update(Comercio ent)
        {
                crud.Update(ent);
           
        }

        public void Delete(Comercio ent)
        {
            crud.Delete(ent);
        }
    }
}
