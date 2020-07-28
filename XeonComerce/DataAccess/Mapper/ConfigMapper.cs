using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class ConfigMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_VALOR = "VALOR";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var config = new Config
            {
                Id = GetStringValue(row, DB_COL_ID),
                Valor = GetDecimalValue(row, DB_COL_VALOR)
            };

            return config;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach(var row in lstRows)
            {
                lstResults.Add(BuildObject(row));
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CONFIG_PR" };

            var c = (Config)entity;
            operation.AddDoubleParam(DB_COL_VALOR, c.Valor);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CONFIG_PR" };
            var c = (Config)entity;
            operation.AddVarcharParam(DB_COL_ID, c.Id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CONFIG_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CONFIG_PR" };
            var c = (Config)entity;
            operation.AddVarcharParam(DB_COL_ID, c.Id);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CONFIG_PR" };
            var c = (Config)entity;
            operation.AddVarcharParam(DB_COL_ID, c.Id);
            operation.AddDoubleParam(DB_COL_VALOR, c.Valor);
            return operation;
        }
    }
}
