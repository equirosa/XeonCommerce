using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class DiaFeriadoManagement
    {
        private DiaFeriadoCrudFactory crud;

        public DiaFeriadoManagement()
        {
            crud = new DiaFeriadoCrudFactory();
        }

        public void Create(DiaFeriado obj)
        {
            crud.Create(obj);
        }

        public List<DiaFeriado> RetrieveAll()
        {
            return crud.RetrieveAll<DiaFeriado>();
        }

        public DiaFeriado RetrieveById(DiaFeriado obj)
        {
            return crud.Retrieve<DiaFeriado>(obj);
        }

        public void Update(DiaFeriado obj)
        {
            crud.Update(obj);
        }

        public void Delete(DiaFeriado obj)
        {
            crud.Delete(obj);
        }
    }
}
