using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class FacturaDetalleManagement
    {
        private FacturaDetalleCrudFactory crud;

        public FacturaDetalleManagement()
        {
            crud = new FacturaDetalleCrudFactory();
        }

        public void Create(FacturaDetalle obj)
        {
            crud.Create(obj);
        }

        public List<FacturaDetalle> RetriveAll()
        {
            return crud.RetrieveAll<FacturaDetalle>();
        }

        public List<FacturaDetalle> RetriveById(FacturaDetalle obj)
        {
            return crud.RetrieveByFactura<FacturaDetalle>(obj);
        }

        public void Update(FacturaDetalle obj)
        {
            crud.Update(obj);
        }

        public void Delete(FacturaDetalle obj)
        {
            crud.Delete(obj);
        }
    }
}
