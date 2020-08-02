using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
{
    public class RolVistaCrudFactory : CrudFactory
    {
        RolVistaMapper mapper;
        VistaMapper vistaMapper;
        
        public RolVistaCrudFactory()
        {
            mapper = new RolVistaMapper();
            vistaMapper = new VistaMapper();

            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var obj = (RolVista)entity;
            var sqlOperation = mapper.GetCreateStatement(obj);

            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity entity)
        {
            var obj = (RolVista)entity;

            dao.ExecuteProcedure(mapper.GetDeleteStatement(obj));
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
             
        public List<T> GetVistasRol<T>(int rol)
        {
            var lstObj = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetVistasRol(rol));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0)
            {
                var objs = vistaMapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstObj.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstObj;
        }

        public void DeleteByRol(int idRol)
        {
            dao.ExecuteProcedure(mapper.DeleteByRol(idRol));
        }

    }
}
