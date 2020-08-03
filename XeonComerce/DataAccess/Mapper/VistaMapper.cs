using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class VistaMapper: EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_URL = "URL";
        private const string DB_COL_NOMBRE = "NOMBRE";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var vista = new Vista()
            {
                Id = GetIntValue(row, DB_COL_ID),
                URL = GetStringValue(row, DB_COL_URL),
                Nombre = GetStringValue(row, DB_COL_NOMBRE)
            };
            return vista;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var obj = BuildObject(row);
                lstResults.Add(obj);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_VISTA_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_VISTA_PR" };
            var o = (Vista)entity;

            operation.AddIntParam(DB_COL_ID, o.Id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
