using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class AusenciasMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_VALOR = "VALOR";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var ausencias = new Ausencias
            {
                Id = GetStringValue(row, DB_COL_ID),
                Valor = GetIntValue(row, DB_COL_VALOR),
                Id_Comercio = GetStringValue(row, DB_COL_ID_COMERCIO)
            };

            return ausencias;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                lstResults.Add(BuildObject(row));
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_AUSENCIAS_PR" };

            var a = (Ausencias)entity;
            operation.AddVarcharParam(DB_COL_ID, a.Id);
            operation.AddIntParam(DB_COL_VALOR, a.Valor);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, a.Id_Comercio);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_AUSENCIAS_PR" };
            var a = (Ausencias)entity;
            operation.AddVarcharParam(DB_COL_ID, a.Id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_AUSENCIAS_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_AUSENCIAS_PR" };
            var a = (Ausencias)entity;
            operation.AddVarcharParam(DB_COL_ID, a.Id);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_AUSENCIAS_PR" };
            var a = (Ausencias)entity;
            operation.AddVarcharParam(DB_COL_ID, a.Id);
            operation.AddDoubleParam(DB_COL_VALOR, a.Valor);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, a.Id_Comercio);
            return operation;
        }
    }
}
