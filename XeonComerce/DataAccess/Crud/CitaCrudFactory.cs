using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
{
    public class CitaCrudFactory:CrudFactory
    {
        CitaMapper mapper;

        public override void Create(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public override void Delete(BaseEntity entity)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
        public override void Update(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
