#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Crud;
using Entities;
#endregion

namespace AppCore
{
    public class ListaDeseosManagement
    {
        #region properties
        private ListaDeseosCrudFactory crudLtsDeseos;
        #endregion

        #region constructor
        public ListaDeseosManagement()
        {
            this.crudLtsDeseos = new ListaDeseosCrudFactory();
        }
        #endregion

        #region methods
        public void Create(ListaDeseos ltsDeseos)
        {

            crudLtsDeseos.Create(ltsDeseos);

        }

        public List<ListaDeseos> RetrieveAll(ListaDeseos ltsDeseos)
        {
            return crudLtsDeseos.RetrieveAllListaCliente<ListaDeseos>(ltsDeseos);
        }

        public ListaDeseos RetrieveById(ListaDeseos ltsDeseos)
        {
            return crudLtsDeseos.Retrieve<ListaDeseos>(ltsDeseos);
        }

        public void Update(ListaDeseos ltsDeseos)
        {
            crudLtsDeseos.Update(ltsDeseos);
        }

        public void Delete(ListaDeseos ltsDeseos)
        {
            crudLtsDeseos.Delete(ltsDeseos);
        }

        public void DeleteAll(ListaDeseos ltsDeseos)
        {
            crudLtsDeseos.DeleteAll(ltsDeseos);
        }
        #endregion
    }
}
