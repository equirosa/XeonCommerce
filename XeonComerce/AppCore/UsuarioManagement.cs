
using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace Management
{
    public class UsuarioManagement
    {
        private UsuarioCrudFactory crud;

        public UsuarioManagement()
        {
            crud = new UsuarioCrudFactory();
        }

        public void Create(Usuario ent)
        {
         crud.Create(ent);
        }

        public List<Usuario> RetrieveAll()
        {
            return crud.RetrieveAll<Usuario>();
        }

        public Usuario RetrieveById(Usuario ent)
        {
            return crud.Retrieve<Usuario>(ent);
        }

        public void Update(Usuario ent)
        {
                crud.Update(ent);
           
        }

        public void Delete(Usuario ent)
        {
            crud.Delete(ent);
        }
    }
}
