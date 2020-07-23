using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
{
    public class EmpleadoComercioSucursalCrudFactory : CrudFactory
    {
        EmpleadoComercioSucursalMapper mapper;
        EmpleadoMapper mapperEmpleado; 

        public EmpleadoComercioSucursalCrudFactory()
        {
            mapper = new EmpleadoComercioSucursalMapper();
            mapperEmpleado = new EmpleadoMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var empleadoComercioSucursal = (EmpleadoComercioSucursal)entity;
            var sqlOperation = mapper.GetCreateStatement(empleadoComercioSucursal);
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
            var lstEmpleadosComercioSucursal = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());


            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {

                    lstEmpleadosComercioSucursal.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }
            return lstEmpleadosComercioSucursal;
        }
              
        public override void Update(BaseEntity entity)
        {
            var empleadoComercioSucursal = (EmpleadoComercioSucursal)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(empleadoComercioSucursal));
        }

        public override void Delete(BaseEntity entity)
        {
            var empleadoComercioSucursal = (EmpleadoComercioSucursal)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(empleadoComercioSucursal));
        }


        public List<T> GetEmpleadosByIdSucursal<T>(string idSucursal)
        {
            var lisEmpleadosComercioSucursal = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapperEmpleado.GetEmpleadosByIdSucursal(idSucursal));


            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapperEmpleado.BuildObjects(lstResult);
                foreach (var c in objs)
                {

                    lisEmpleadosComercioSucursal.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lisEmpleadosComercioSucursal;

        }
    }
}
