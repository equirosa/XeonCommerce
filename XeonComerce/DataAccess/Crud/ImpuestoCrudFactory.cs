#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Dao;
using Entities;
#endregion

namespace DataAccess.Crud
{
    public class ImpuestoCrudFactory : CrudFactory
    {
        #region properties
        ImpuestoMapper mapper;
        #endregion

        #region constructor
        public ImpuestoCrudFactory() : base()
        {
            mapper = new ImpuestoMapper();
            dao = SqlDao.GetInstance();
        }
        #endregion

        #region methods
        public override void Create(BaseEntity entity)
        {
            var impuesto = (Impuesto)entity;
            var sqlOperation = mapper.GetCreateStatement(impuesto);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity entity)
        {
            var impuesto = (Impuesto)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(impuesto));
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
            var lstImpuestos = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstImpuestos.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstImpuestos;
        }

        public override void Update(BaseEntity entity)
        {
            var impuesto = (Impuesto)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(impuesto));
        }
        #endregion
    }
}
