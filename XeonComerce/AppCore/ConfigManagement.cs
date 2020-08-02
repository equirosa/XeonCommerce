
using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;

namespace Management
{
    public class ConfigManagement
    {
        private ConfigCrudFactory crud;

        public ConfigManagement()
        {
            crud = new ConfigCrudFactory();
        }

        public void Create(Config ent)
        {
         crud.Create(ent);
        }

        public List<Config> RetrieveAll()
        {
            return crud.RetrieveAll<Config>();
        }

        public Config RetrieveById(Config ent)
        {
            return crud.Retrieve<Config>(ent);
        }

        public void Update(Config ent)
        {
                crud.Update(ent);
           
        }

        public void Delete(Config ent)
        {
            crud.Delete(ent);
        }
    }
}
