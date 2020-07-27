using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccess.Crud
{
	public class SucursalCrudFactory: CrudFactory
    {
        SucursalMapper mapper;

        public SucursalCrudFactory(): base()
        {
            mapper = new SucursalMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var sucursal = (Sucursal)entity;
            var sqlOperation = mapper.GetCreateStatement(sucursal);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstSucursales = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var suc in objs)
                {
                    lstSucursales.Add((T)Convert.ChangeType(suc, typeof(T)));
                }
            }

            return lstSucursales;
        }

        public override void Update(BaseEntity entity)
        {
            var sucursal = (Sucursal)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(sucursal));
        }

        public override void Delete(BaseEntity entity)
        {
            var sucursal = (Sucursal)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(sucursal));
        }
    }
}
