using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
{
    public class EspecialidadCrudFactory: CrudFactory
    {
        EspecialidadMapper mapper; 

        public EspecialidadCrudFactory()
        {
            mapper = new EspecialidadMapper();
            dao = SqlDao.GetInstance();
        }


        public override void Create(BaseEntity entity)
        {
            var especialidad = (Especialidad)entity;
            var sqlOperation = mapper.GetCreateStatement(especialidad);

            dao.ExecuteProcedure(sqlOperation);
        }

        public void DeleteEspecialidadXServicio(BaseEntity entity)
        {
            dao.ExecuteProcedure(mapper.GetDeleteEspecialidadXServicio(entity));
        }

        public void DeleteEspecialidadXRol(BaseEntity entity)
        {
            dao.ExecuteProcedure(mapper.GetDeleteEspecialidadXRol(entity));
        }

        public List<T> GetEspecialidadRol<T>(int rol)
        {
            var lstObj = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetEspecialidadRol(rol));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstObj.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstObj;
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

        public override void Delete(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
