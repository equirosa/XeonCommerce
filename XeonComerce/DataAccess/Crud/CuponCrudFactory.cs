#region libraries
using System;
using System.Collections.Generic;
using DataAccess.Dao;
using Entities;
#endregion

namespace DataAccess.Crud
{
	public class CuponCrudFactory : CrudFactory
    {
        #region properties
        CuponMapper mapper;
        #endregion

        #region constructor
        public CuponCrudFactory() : base()
        {
            mapper = new CuponMapper();
            dao = SqlDao.GetInstance();
        }
        #endregion

        #region methods
        public override void Create(BaseEntity entity)
        {
            var cupon = (Cupon)entity;
            var sqlOperation = mapper.GetCreateStatement(cupon);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity entity)
        {
            var cupon = (Cupon)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(cupon));
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
            var lstCupon = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstCupon.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstCupon;
        }

        public override void Update(BaseEntity entity)
        {
            var cupon = (Cupon)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(cupon));
        }
        #endregion
    }
}
