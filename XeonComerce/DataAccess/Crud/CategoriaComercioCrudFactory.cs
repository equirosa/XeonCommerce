using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccess.Crud
{
	public class CategoriaComercioCrudFactory : CrudFactory
    {
        CategoriaComercioMapper mapper;

        public CategoriaComercioCrudFactory() : base()
        {
            mapper = new CategoriaComercioMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var ent = (CategoriaComercio)entity;
            var sqlOperation = mapper.GetCreateStatement(ent);
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
                foreach (var c in objs)
                {
                    lst.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lst;
        }
        public List<T> RetrieveByComercio<T>(BaseEntity entity)
        {
            var lst = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllCatStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lst.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lst;
        }

        public override void Delete(BaseEntity entity)
        {
            var ent = (CategoriaComercio)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(ent));
        }
        public void DeleteAll(BaseEntity entity)
        {
            var ent = (CategoriaComercio)entity;
            dao.ExecuteProcedure(mapper.GetDeleteAllStatement(ent));
        }

        public override void Update(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
