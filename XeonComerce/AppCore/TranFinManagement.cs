using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class TranFinManagement
    {
        private TranFinCrudFactory crud;

        public TranFinManagement()
        {
            crud = new TranFinCrudFactory();
        }

        public void Create(TranFin obj)
        {
            crud.Create(obj);
        }

        public List<TranFin> RetriveAll()
        {
            return crud.RetrieveAll<TranFin>();
        }

        public TranFin RetriveById(TranFin obj)
        {
            return crud.Retrieve<TranFin>(obj);
        }

        public void Update(TranFin obj)
        {
            crud.Update(obj);
        }

        public void Delete(TranFin obj)
        {
            crud.Delete(obj);
        }
    }
}
