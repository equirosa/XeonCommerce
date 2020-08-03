#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Crud;
using Entities;
#endregion

namespace AppCore
{
    public class ProductoServicioManagement
    {
        #region properties
        private ProductoServicioCrudFactory crudProdAndServ;
        #endregion

        #region constructor
        public ProductoServicioManagement()
        {
            this.crudProdAndServ = new ProductoServicioCrudFactory();
        }
        #endregion

        #region methods
        public void Create(Producto prodAndServ)
        {
            crudProdAndServ.Create(prodAndServ);
        }

        public List<Servicio> RetrieveAllServicios()
        {
            return crudProdAndServ.RetrieveAllServicios<Servicio>();
        }

        public List<Producto> RetrieveAllProductos()
        {
            return crudProdAndServ.RetrieveAllProductos<Producto>();
        }

        public Servicio RetrieveByIdServicio(Servicio servicio)
        {
            return crudProdAndServ.RetrieveServicio<Servicio>(servicio);
        }

        public Producto RetrieveByIdProducto(Producto producto)
        {
            return crudProdAndServ.RetrieveProducto<Producto>(producto);
        }

        public void Update(Producto prodAndServ)
        {
            crudProdAndServ.Update(prodAndServ);
        }

        public void Delete(Producto prodAndServ)
        {
            crudProdAndServ.Delete(prodAndServ);
        }
        #endregion
    }
}
