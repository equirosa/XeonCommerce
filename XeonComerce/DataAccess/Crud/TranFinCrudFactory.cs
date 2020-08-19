using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
{
    public class TranFinCrudFactory : CrudFactory
    {
        TranFinMapper mapper;

        public TranFinCrudFactory() : base()
        {
            mapper = new TranFinMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var e = (TranFin)entity;
            var sqlOperation = mapper.GetCreateStatement(e);
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
            var lst = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var arc in objs)
                {
                    lst.Add((T)Convert.ChangeType(arc, typeof(T)));
                }
            }

            return lst;
        }

        public override void Update(BaseEntity entity)
        {
            var e = (TranFin)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(e));
        }

        public override void Delete(BaseEntity entity)
        {
            var e = (TranFin)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(e));
        }

        public T RetrieveUltimo<T>()
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetrieveUltimo());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }
    }
}
