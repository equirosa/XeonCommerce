using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class FacturaMaestroManagement
    {
        private FacturaMasterCrudFactory crud;

        public FacturaMaestroManagement()
        {
            crud = new FacturaMasterCrudFactory();
        }

        public void Create(FacturaMaestro obj)
        {
            crud.Create(obj);
        }

        public List<FacturaMaestro> RetriveAll()
        {
            return crud.RetrieveAll<FacturaMaestro>();
        }

        public FacturaMaestro RetriveById(FacturaMaestro obj)
        {
            return crud.Retrieve<FacturaMaestro>(obj);
        }

        public void Update(FacturaMaestro obj)
        {
            crud.Update(obj);
        }

        public void Delete(FacturaMaestro obj)
        {
            crud.Delete(obj);
        }
    }
}
