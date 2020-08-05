using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class CarritoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ID_PRODUCTO = "ID_PRODUCTO";
        private const string DB_COL_ID_CANTIDAD = "CANTIDAD";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CARRITO_PR" };

            var e = (Carrito)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, e.IdUsuario);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, e.IdProducto);
            operation.AddIntParam(DB_COL_ID_CANTIDAD, e.Cantidad);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CARRITO_PR" };

            var e = (Carrito)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, e.IdUsuario);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, e.IdProducto);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CARRITO_PR" };
            var e = (Carrito)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, e.IdUsuario);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_CARRITO_PR" };

            var e = (Carrito)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, e.IdUsuario);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, e.IdProducto);
            operation.AddIntParam(DB_COL_ID_CANTIDAD, e.Cantidad);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CARRITO_PR" };

            var e = (Carrito)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, e.IdUsuario);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, e.IdProducto);
            return operation;
        }

        public SqlOperation GetDeleteAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_TODO_CARRITO_PR" };

            var e = (Carrito)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, e.IdUsuario);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, e.IdProducto);
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
            var e = new Carrito
            {
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO),
                IdProducto = GetIntValue(row, DB_COL_ID_PRODUCTO),
                Cantidad = GetIntValue(row, DB_COL_ID_CANTIDAD)
        };

            return e;

        }

        SqlOperation ISqlStaments.GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }
    }
}
