using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class TranFinMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_MONTO = "MONTO";
        private const string DB_COL_METODO = "METODO";
        private const string DB_COL_ID_CLIENTE = "ID_CLIENTE";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_ESTADO = "ESTADO";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_TRANFIN_PR" };

            var e = (TranFin)entity;
            operation.AddDoubleParam(DB_COL_MONTO, e.Monto);
            operation.AddVarcharParam(DB_COL_METODO, e.Metodo);
            operation.AddVarcharParam(DB_COL_ID_CLIENTE, e.IdCliente);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, e.IdComercio);
            operation.AddDateTimeParam(DB_COL_FECHA, e.Fecha);
            operation.AddVarcharParam(DB_COL_ESTADO, e.Estado);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_TRANFIN_PR" };

            var e = (TranFin)entity;
            operation.AddIntParam(DB_COL_ID, e.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_TRANFIN_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_TRANFIN_PR" };

            var e = (TranFin)entity;
            operation.AddIntParam(DB_COL_ID, e.Id);
            operation.AddDoubleParam(DB_COL_MONTO, e.Monto);
            operation.AddVarcharParam(DB_COL_METODO, e.Metodo);
            operation.AddVarcharParam(DB_COL_ID_CLIENTE, e.IdCliente);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, e.IdComercio);
            operation.AddDateTimeParam(DB_COL_FECHA, e.Fecha);
            operation.AddVarcharParam(DB_COL_ESTADO, e.Estado);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_TRANFIN_PR" };

            var e = (TranFin)entity;
            operation.AddIntParam(DB_COL_ID, e.Id);
            return operation;
        }

        public SqlOperation GetRetrieveUltimo()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ULT_DEL_TRANFIN_PR_PR" };
            return operation; 
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var e = BuildObject(row);
                lstResults.Add(e);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var e = new TranFin
            {
                Id = GetIntValue(row, DB_COL_ID),
                Monto = GetDoubleValue(row, DB_COL_MONTO),
                Metodo = GetStringValue(row, DB_COL_METODO),
                IdCliente = GetStringValue(row, DB_COL_ID_CLIENTE),
                IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO),
                Fecha = GetDateValue(row, DB_COL_FECHA),
                Estado = GetStringValue(row, DB_COL_ESTADO)
            };

            return e;
        }
    }
}
