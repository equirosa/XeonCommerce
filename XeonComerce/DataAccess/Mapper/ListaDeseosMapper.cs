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
    public class ListaDeseosMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        #region properties
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ID_PRODUCTO = "ID_PRODUCTO";
        private const string DB_COL_ID_CANTIDAD = "CANTIDAD";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        #endregion

        #region methods
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var ltsDeseos = new ListaDeseos
            {
                Id = GetIntValue(row, DB_COL_ID),
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO),
                IdProducto = GetIntValue(row, DB_COL_ID_PRODUCTO),
                Cantidad = GetIntValue(row, DB_COL_ID_CANTIDAD),
                IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO)
            };

            return ltsDeseos;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var ltsDeseos = BuildObject(row);
                lstResults.Add(ltsDeseos);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_LISTA_DESEOS_PR" };

            var ltsDeseos = (ListaDeseos)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, ltsDeseos.IdUsuario);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, ltsDeseos.IdProducto);
            operation.AddIntParam(DB_COL_ID_CANTIDAD, ltsDeseos.Cantidad);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, ltsDeseos.IdComercio);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_PROD_LISTA_DESEO_PR" };

            var ltsDeseos = (ListaDeseos)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, ltsDeseos.IdUsuario);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, ltsDeseos.IdProducto);

            return operation;
        }

        public SqlOperation GetDeleteAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ALL_LISTA_DESEO_PR" };

            var ltsDeseos = (ListaDeseos)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, ltsDeseos.IdUsuario);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_LISTA_DESEO_CLIENTE_PR" };

            var ltsDeseos = (ListaDeseos)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, ltsDeseos.IdUsuario);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}

