
using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace Management
{
    public class UsuarioTelegramManagement
    {
        private UsuarioTelegramCrudFactory crud;

        public UsuarioTelegramManagement()
        {
            crud = new UsuarioTelegramCrudFactory();
        }

        public void Create(UsuarioTelegram ent)
        {
            crud.Create(ent);
        }

        public List<UsuarioTelegram> RetrieveAll()
        {
            return crud.RetrieveAll<UsuarioTelegram>();
        }

        public UsuarioTelegram RetrieveById(UsuarioTelegram ent)
        {
            return crud.Retrieve<UsuarioTelegram>(ent);
        }

        public void Update(UsuarioTelegram ent)
        {
                crud.Update(ent);
           
        }

        public void Delete(UsuarioTelegram ent)
        {
            crud.Delete(ent);
        }
    }
}
