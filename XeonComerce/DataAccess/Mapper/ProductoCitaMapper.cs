using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class ProductoCitaMapper: EntityMapper, ISqlStaments, IObjectMapper
    {

        private const string DB_COL_ID_CITA = "ID_CITA";
        private const string DB_COL_ID_PRODUCTO = "ID_PRODUCTO";
        private const string DB_COL_CANTIDAD = "CANTIDAD";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var pc = (ProductoCita)entity; 

            var operation = new SqlOperation { ProcedureName = "CRE_PRODUCTO_CITA_PR" };
            operation.AddIntParam(DB_COL_ID_CITA, pc.IdCita);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, pc.IdProducto);
            operation.AddIntParam(DB_COL_CANTIDAD, pc.Cantidad);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_PRODUCTO_CITA_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var productoCita = new ProductoCita()
            {
                IdCita = GetIntValue(row, DB_COL_ID_CITA),
                IdProducto = GetIntValue(row, DB_COL_ID_PRODUCTO),
                Cantidad = GetIntValue(row, DB_COL_CANTIDAD)
               
            };
            return productoCita;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var cita = BuildObject(row);
                lstResults.Add(cita);
            }

            return lstResults;
        }
    }
}
