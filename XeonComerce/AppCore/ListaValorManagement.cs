using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Crud;
using Entities;

namespace AppCore
{
    public class ListaValorManagement
    {
        private ListaValorCrudFactory crudListaValor;

        public ListaValorManagement()
        {
            crudListaValor = new ListaValorCrudFactory();
        }
        public List<ListaValor> RetriveAll()
        {
            return crudListaValor.RetrieveAll<ListaValor>();
        }
    }
}
