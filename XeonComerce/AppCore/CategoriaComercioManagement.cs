
using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace Management
{
    public class CategoriaComercioManagement
    {
        private CategoriaComercioCrudFactory crud;

        public CategoriaComercioManagement()
        {
            crud = new CategoriaComercioCrudFactory();
        }

        public void Create(CategoriaComercio ent)
        {
         crud.Create(ent);
        }

        public List<CategoriaComercio> RetrieveAll()
        {
            return crud.RetrieveAll<CategoriaComercio>();
        }
        public List<CategoriaComercio> RetrieveByComercio(CategoriaComercio ent)
        {
            return crud.RetrieveByComercio<CategoriaComercio>(ent);
        }

        public CategoriaComercio RetrieveById(CategoriaComercio ent)
        {
            return crud.Retrieve<CategoriaComercio>(ent);
        }

        public void Delete(CategoriaComercio ent)
        {
            crud.Delete(ent);

        }
        public void DeleteAll(CategoriaComercio ent)
        {
            crud.DeleteAll(ent);

        }
    }
}
