using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccess.Crud
{
	public class DireccionCrudFactory: CrudFactory
    {
        DireccionMapper mapper;

        public DireccionCrudFactory() : base()
        {
            mapper = new DireccionMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var direccion = (Direccion)entity;
            var sqlOperation = mapper.GetCreateStatement(direccion);
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
            var lstDirecciones = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var dir in objs)
                {
                    lstDirecciones.Add((T)Convert.ChangeType(dir, typeof(T)));
                }
            }

            return lstDirecciones;
        }

        public override void Update(BaseEntity entity)
        {
            var direccion = (Direccion)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(direccion));
        }

        public override void Delete(BaseEntity entity)
        {
            var direccion = (Direccion)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(direccion));
        }
    }
}
