#region libraries
using System;
using System.Collections.Generic;
using DataAccess.Dao;
using Entities;
#endregion

namespace DataAccess.Crud
{
	public class ProductoServicioCrudFactory : CrudFactory
    {
        #region properties
        ProductoServicioMapper mapper;
        #endregion

        #region constructor
        public ProductoServicioCrudFactory() : base()
        {
            mapper = new ProductoServicioMapper();
            dao = SqlDao.GetInstance();
        }
        #endregion

        #region methods
        public override void Create(BaseEntity entity)
        {
            var prodAndServ = (Producto)entity;
            var sqlOperation = mapper.GetCreateStatement(prodAndServ);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity entity)
        {
            var prodAndServ = (Producto)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(prodAndServ));
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public T RetrieveProducto<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatementProducto(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObjectProducto(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public T RetrieveServicio<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatementServicio(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObjectServicio(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public List<T> RetrieveAllServicios<T>()
        {
            var lstServicios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatementServicios());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjectsServicios(lstResult);
                foreach (var c in objs)
                {
                    lstServicios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstServicios;
        }

        public List<T> RetrieveAllProductos<T>()
        {
            var lstProductos = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatementProductos());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjectsProductos(lstResult);
                foreach (var c in objs)
                {
                    lstProductos.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstProductos;
        }

        public override void Update(BaseEntity entity)
        {
            var prodAndServ = (Producto)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(prodAndServ));
        }
        #endregion
    }
}
