using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class FacturaDetalleMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID_LINEA = "ID_LINEA";
        private const string DB_COL_ID_PRODUCTO = "ID_PRODUCTO";
        private const string DB_COL_VALOR = "VALOR";
        private const string DB_COL_DESCUENTO = "DESCUENTO";
        private const string DB_COL_CANTIDAD = "CANTIDAD";
        private const string DB_COL_IVA = "IVA";
        private const string DB_COL_ID_FACTURA = "ID_FACTURA";
        private const string DB_COL_TOTAL_LINEA = "TOTAL_LINEA";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_FACTURA_DETALLE" };

            var e = (FacturaDetalle)entity;
            operation.AddIntParam(DB_COL_ID_PRODUCTO, e.IdProducto);
            operation.AddDoubleParam(DB_COL_VALOR, e.Valor);
            operation.AddDoubleParam(DB_COL_DESCUENTO, e.Descuento);
            operation.AddIntParam(DB_COL_CANTIDAD, e.Cantidad);
            operation.AddIntParam(DB_COL_IVA, e.IVA);
            operation.AddIntParam(DB_COL_ID_FACTURA, e.IdFactura);
            operation.AddDoubleParam(DB_COL_TOTAL_LINEA, e.TotalLinea);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_FACTURA_DETALLE" };

            var e = (FacturaDetalle)entity;
            operation.AddIntParam(DB_COL_ID_FACTURA, e.IdFactura);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_FACTURA_DETALLE" };
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_FACTURA_DETALLE" };

            var e = (FacturaDetalle)entity;
            operation.AddIntParam(DB_COL_ID_LINEA, e.IdLinea);
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
            var e = new FacturaDetalle
            {
                IdLinea = GetIntValue(row, DB_COL_ID_LINEA),
                IdProducto = GetIntValue(row, DB_COL_ID_PRODUCTO),
                Valor = GetDoubleValue(row, DB_COL_VALOR),
                Descuento = GetDoubleValue(row, DB_COL_DESCUENTO),
                Cantidad = GetIntValue(row, DB_COL_CANTIDAD),
                IVA = GetIntValue(row, DB_COL_IVA),
                IdFactura = GetIntValue(row, DB_COL_ID_FACTURA),
                TotalLinea = GetDoubleValue(row, DB_COL_TOTAL_LINEA)
            };

            return e;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
