using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class BitacoraManagement
    {
        private BitacoraCrudFactory crud;

        public BitacoraManagement()
        {
            crud = new BitacoraCrudFactory();
        }

        public void Create(Bitacora obj)
        {
            crud.Create(obj);
        }

        public List<Bitacora> RetrieveAll()
        {
            return crud.RetrieveAll<Bitacora>();
        }

        public Bitacora RetrieveById(Bitacora bitacora)
        {
            return crud.Retrieve<Bitacora>(bitacora);
        }
    }
}
