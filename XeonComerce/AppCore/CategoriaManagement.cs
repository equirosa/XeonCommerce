
using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace Management
{
    public class CategoriaManagement
    {
        private CategoriaCrudFactory crud;

        public CategoriaManagement()
        {
            crud = new CategoriaCrudFactory();
        }

        public void Create(Categoria ent)
        {
         crud.Create(ent);
        }

        public List<Categoria> RetrieveAll()
        {
            return crud.RetrieveAll<Categoria>();
        }

        public Categoria RetrieveById(Categoria ent)
        {
            return crud.Retrieve<Categoria>(ent);
        }

        public void Update(Categoria ent)
        {
                crud.Update(ent);
           
        }

        public void Delete(Categoria ent)
        {
            crud.Delete(ent);
        }
    }
}
