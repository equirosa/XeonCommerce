#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
#endregion

namespace DataAccess
{
    public class ImpuestoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        #region properties
        private const string DB_COL_ID = "ID_IMPUESTO";
        private const string DB_COL_VALOR = "VALOR";
        #endregion

        #region methods
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var impuesto = new Impuesto
            {
                Id = GetIntValue(row, DB_COL_ID),
                Valor = GetStringValue(row, DB_COL_VALOR)
            };

            return impuesto;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var impuesto = BuildObject(row);
                lstResults.Add(impuesto);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_IMPUESTO_PR" };

            var im = (Impuesto)entity;

            operation.AddVarcharParam(DB_COL_VALOR, im.Valor);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_IMPUESTO_PR" };

            var im = (Impuesto)entity;

            operation.AddIntParam(DB_COL_ID, im.Id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_IMPUESTO_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_IMPUESTO_PR" };

            var im = (Impuesto)entity;

            operation.AddIntParam(DB_COL_ID, im.Id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_IMPUESTO_PR" };

            var cpn = (Impuesto)entity;

            var im = (Impuesto)entity;

            operation.AddIntParam(DB_COL_ID, im.Id);
            operation.AddVarcharParam(DB_COL_VALOR, im.Valor);

            return operation;
        }
        #endregion
    }
}
