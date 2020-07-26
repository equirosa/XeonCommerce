using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
{
    public class SeccionHorarioCrudFactory : CrudFactory
    {
        SeccionHorarioMapper mapper;

        public SeccionHorarioCrudFactory() : base()
        {
            mapper = new SeccionHorarioMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var seccionHorario = (SeccionHorario)entity;
            var sqlOperation = mapper.GetCreateStatement(seccionHorario);
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
            var lstSeccionHorario = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstSeccionHorario.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstSeccionHorario;
        }

        public override void Update(BaseEntity entity)
        {
            var seccionHorario = (SeccionHorario)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(seccionHorario));
        }

        public override void Delete(BaseEntity entity)
        {
            var seccionHorario = (SeccionHorario)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(seccionHorario));
        }

        public List<T> GetHorarioEmpleado<T>(SeccionHorario seccionHorario)
        {
            var lstSeccionHorario = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveHorarioEmpleado(seccionHorario));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstSeccionHorario.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstSeccionHorario;
        }
    }
}
