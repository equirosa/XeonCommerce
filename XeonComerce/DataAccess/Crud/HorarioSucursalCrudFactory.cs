using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccess.Crud
{
	public class HorarioSucursalCrudFactory : CrudFactory
    {
        HorarioSucursalMapper mapper;

        public HorarioSucursalCrudFactory() : base()
        {
            mapper = new HorarioSucursalMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var horarioSucursal = (HorarioSucursal)entity;
            var sqlOperation = mapper.GetCreateStatement(horarioSucursal);
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
            var lstHorarioSucursal = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstHorarioSucursal.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstHorarioSucursal;
        }

        public override void Update(BaseEntity entity)
        {
            var horarioSucursal = (HorarioSucursal)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(horarioSucursal));
        }

        public override void Delete(BaseEntity entity)
        {
            var horarioSucursal = (HorarioSucursal)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(horarioSucursal));
        }
    }
}
