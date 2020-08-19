using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class FacturaMaestroMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID_FACTURA = "ID_FACTURA";
        private const string DB_COL_ID_TRANSACCION = "ID_TRANSACCION";
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_CEDULA_JURIDICA = "CEDULA_JURIDICA";
        private const string DB_COL_ID_CLIENTE = "ID_CLIENTE";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_FACTURA_MAESTRO" };

            var e = (FacturaMaestro)entity;
            operation.AddIntParam(DB_COL_ID_TRANSACCION, e.IdTransaccion);
            operation.AddDateTimeParam(DB_COL_FECHA, e.Fecha);
            operation.AddVarcharParam(DB_COL_CEDULA_JURIDICA, e.CedulaJuridica);
            operation.AddVarcharParam(DB_COL_ID_CLIENTE, e.IdCliente);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_FACTURA_MAESTRO" };

            var e = (FacturaMaestro)entity;
            operation.AddIntParam(DB_COL_ID_FACTURA, e.IdFactura);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_FACTURA_MAESTRO" };
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_FACTURA_MAESTRO" };

            var e = (FacturaMaestro)entity;
            operation.AddIntParam(DB_COL_ID_FACTURA, e.IdFactura);
            return operation;
        }

        public SqlOperation GetRetrieveUltimo()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ULT_FACTURA_MAESTRO_PR" };
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
            var e = new FacturaMaestro
            {
                IdFactura = GetIntValue(row, DB_COL_ID_FACTURA),
                IdTransaccion = GetIntValue(row, DB_COL_ID_TRANSACCION),
                Fecha = GetDateValue(row, DB_COL_FECHA),
                CedulaJuridica = GetStringValue(row, DB_COL_CEDULA_JURIDICA),
                IdCliente = GetStringValue(row, DB_COL_ID_CLIENTE)
            };

            return e;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
