#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Crud;
using Entities;
#endregion

namespace AppCore
{
    public class CuponManagement
    {
        #region properties
        private CuponCrudFactory crudCupon;
        #endregion

        #region constructor
        public CuponManagement()
        {
            this.crudCupon = new CuponCrudFactory();
        }
        #endregion

        #region methods
        public void Create(Cupon cupon)
        {

            crudCupon.Create(cupon);

        }

        public List<Cupon> RetrieveAll()
        {
            return crudCupon.RetrieveAll<Cupon>();
        }

        public Cupon RetrieveById(Cupon cupon)
        {
            return crudCupon.Retrieve<Cupon>(cupon);
        }

        public void Update(Cupon cupon)
        {
            crudCupon.Update(cupon);
        }

        public void Delete(Cupon cupon)
        {
            crudCupon.Delete(cupon);
        }
        #endregion
    }
}
