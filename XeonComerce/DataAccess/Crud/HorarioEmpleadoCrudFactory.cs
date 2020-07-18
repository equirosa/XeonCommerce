using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
{
    public class HorarioEmpleadoCrudFactory : CrudFactory
    {
        HorarioEmpleadoMapper mapper;

        public HorarioEmpleadoCrudFactory() : base()
        {
            mapper = new HorarioEmpleadoMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var horarioEmpleado = (HorarioEmpleado)entity;
            var sqlOperation = mapper.GetCreateStatement(horarioEmpleado);
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
            var lstHorarioEmpelado = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstHorarioEmpelado.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstHorarioEmpelado;
        }

        public override void Update(BaseEntity entity)
        {
            var horarioEmpleado = (HorarioEmpleado)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(horarioEmpleado));
        }

        public override void Delete(BaseEntity entity)
        {
            var horarioEmpleado = (HorarioEmpleado)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(horarioEmpleado));
        }

    }
}
