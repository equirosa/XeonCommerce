#region libraries
using System;
using System.Collections.Generic;
using DataAccess.Dao;
using Entities;
#endregion

namespace DataAccess.Crud
{
    public class CategoriaUsuarioCrudFactory : CrudFactory
    {
        #region properties
        CategoriaUsuarioMapper mapper;
        #endregion

        #region constructor
        public CategoriaUsuarioCrudFactory() : base()
        {
            mapper = new CategoriaUsuarioMapper();
            dao = SqlDao.GetInstance();
        }
        #endregion

        #region methods
        public override void Create(BaseEntity entity)
        {
            var catUsuario = (CategoriaUsuario)entity;
            var sqlOperation = mapper.GetCreateStatement(catUsuario);
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

        public List<T> RetrieveByUsuario<T>(BaseEntity entity)
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
            var catUsuario = (CategoriaUsuario)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(catUsuario));
        }

        public void DeleteAll(BaseEntity entity)
        {
            var catUsuario = (CategoriaUsuario)entity;
            dao.ExecuteProcedure(mapper.GetDeleteAllStatement(catUsuario));
        }

        public override void Update(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}

