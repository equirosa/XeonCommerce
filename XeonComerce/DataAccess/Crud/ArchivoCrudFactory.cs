using DataAccess.Dao;
using DataAccess.Mapper;
using DataAccessLayer.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
{
    public class ArchivoCrudFactory : CrudFactory
    {
        ArchivoMapper mapper;

        public ArchivoCrudFactory() : base()
        {
            mapper = new ArchivoMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var archivo = (Archivo)entity;
            var sqlOperation = mapper.GetCreateStatement(archivo);
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
            var lstArchivos = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var arc in objs)
                {
                    lstArchivos.Add((T)Convert.ChangeType(arc, typeof(T)));
                }
            }

            return lstArchivos;
        }

        public override void Update(BaseEntity entity)
        {
            var archivo = (Archivo)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(archivo));
        }

        public override void Delete(BaseEntity entity)
        {
            var archivo = (Archivo)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(archivo));
        }

    }
}
