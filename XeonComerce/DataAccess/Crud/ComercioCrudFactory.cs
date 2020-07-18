﻿using System;
using System.Collections.Generic;
using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;


namespace DataAccessLayer.Crud
{
    public class ComercioCrudFactory : CrudFactory
    {
        ComercioMapper mapper;

        public ComercioCrudFactory() : base()
        {
            mapper = new ComercioMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var ent = (Comercio)entity;
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

        public override void Update(BaseEntity entity)
        {
            var ent = (Comercio)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(ent));
        }

        public override void Delete(BaseEntity entity)
        {
            var ent = (Comercio)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(ent));
        }
    }
}
