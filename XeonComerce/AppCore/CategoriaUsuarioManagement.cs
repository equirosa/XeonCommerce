#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Crud;
using Entities;
#endregion

namespace AppCore
{
    public class CategoriaUsuarioManagement
    {
        #region properties
        private CategoriaUsuarioCrudFactory crudCategoriaUsuario;
        #endregion

        #region constructor
        public CategoriaUsuarioManagement()
        {
            this.crudCategoriaUsuario = new CategoriaUsuarioCrudFactory();
        }
        #endregion

        #region methods
        public void Create(CategoriaUsuario ent)
        {
            crudCategoriaUsuario.Create(ent);
        }

        public List<CategoriaUsuario> RetrieveAll()
        {
            return crudCategoriaUsuario.RetrieveAll<CategoriaUsuario>();
        }
        public List<CategoriaUsuario> RetrieveByUsuario(CategoriaUsuario ent)
        {
            return crudCategoriaUsuario.RetrieveByUsuario<CategoriaUsuario>(ent);
        }

        public CategoriaUsuario RetrieveById(CategoriaUsuario ent)
        {
            return crudCategoriaUsuario.Retrieve<CategoriaUsuario>(ent);
        }

        public void Delete(CategoriaUsuario ent)
        {
            crudCategoriaUsuario.Delete(ent);

        }
        public void DeleteAll(CategoriaUsuario ent)
        {
            crudCategoriaUsuario.DeleteAll(ent);

        }
        #endregion
    }
}
