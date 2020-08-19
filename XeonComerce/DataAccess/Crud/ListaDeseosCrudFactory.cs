#region libraries
using System;
using System.Collections.Generic;
using DataAccess.Dao;
using Entities;
#endregion

namespace DataAccess.Crud
{
    public class ListaDeseosCrudFactory : CrudFactory
    {
        #region properties
        ListaDeseosMapper mapper;
        #endregion

        #region constructor
        public ListaDeseosCrudFactory() : base()
        {
            mapper = new ListaDeseosMapper();
            dao = SqlDao.GetInstance();
        }
        #endregion

        #region methods
        public override void Create(BaseEntity entity)
        {
            var ltsDeseos = (ListaDeseos)entity;
            var sqlOperation = mapper.GetCreateStatement(ltsDeseos);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity entity)
        {
            var ltsDeseos = (ListaDeseos)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(ltsDeseos));
        }

        public void DeleteAll(BaseEntity entity)
        {
            var ltsDeseos = (ListaDeseos)entity;
            dao.ExecuteProcedure(mapper.GetDeleteAllStatement(ltsDeseos));
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
            var ltsDeseos = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    ltsDeseos.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return ltsDeseos;
        }

        public List<T> RetrieveAllListaCliente<T>(BaseEntity entity)
        {
            var ltsDeseos = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    ltsDeseos.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return ltsDeseos;
        }

        public override void Update(BaseEntity entity)
        {
            var ltsDeseos = (ListaDeseos)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(ltsDeseos));
        }
        #endregion
    }
}
