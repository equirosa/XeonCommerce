using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class AusenciasManagement
    {
        private AusenciasCrudFactory crud;

        public AusenciasManagement()
        {
            crud = new AusenciasCrudFactory();
        }

        public void Create(Ausencias aus)
        {
            crud.Create(aus);
        }

        public List<Ausencias> RetrieveAll()
        {
            return crud.RetrieveAll<Ausencias>();
        }

        public Ausencias RetrieveById(Ausencias aus)
        {
            return crud.Retrieve<Ausencias>(aus);
        }

        public void Update(Ausencias aus)
        {
            crud.Update(aus);
        }

        public void Delete(Ausencias aus)
        {
            crud.Delete(aus);
        }
    }
}
