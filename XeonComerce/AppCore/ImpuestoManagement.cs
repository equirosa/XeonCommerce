#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Crud;
using Entities;
#endregion

namespace AppCore
{
    public class ImpuestoManagement
    {
        #region properties
        private ImpuestoCrudFactory crudImpuesto;
        #endregion

        #region constructor
        public ImpuestoManagement()
        {
            this.crudImpuesto = new ImpuestoCrudFactory();
        }
        #endregion

        #region methods
        public void Create(Impuesto impuesto)
        {

            crudImpuesto.Create(impuesto);

        }

        public List<Impuesto> RetrieveAll()
        {
            return crudImpuesto.RetrieveAll<Impuesto>();
        }

        public Impuesto RetrieveById(Impuesto impuesto)
        {
            return crudImpuesto.Retrieve<Impuesto>(impuesto);
        }

        public void Update(Impuesto impuesto)
        {
            crudImpuesto.Update(impuesto);
        }

        public void Delete(Impuesto impuesto)
        {
            crudImpuesto.Delete(impuesto);
        }
        #endregion
    }
}
