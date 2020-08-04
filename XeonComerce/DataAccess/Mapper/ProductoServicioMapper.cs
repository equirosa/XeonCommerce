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
    public class ProductoServicioMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        #region properties
        private const string DB_COL_ID = "ID";
        private const string DB_COL_TIPO = "TIPO";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_PRECIO = "PRECIO";
        private const string DB_COL_CANTIDAD = "CANTIDAD";
        private const string DB_COL_DESCUENTO = "DESCUENTO";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_IMPUESTO = "IMPUESTO";
        private const string DB_COL_DURACION = "DURACION";
        private const string DB_COL_IMPUESTO = "IMPUESTO";
        #endregion

        #region methods
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            throw new NotImplementedException();
        }

        public BaseEntity BuildObjectProducto(Dictionary<string, object> row)
        {
            var producto = new Producto
            {
                Id = GetIntValue(row, DB_COL_ID),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Precio = GetDoubleValue(row, DB_COL_PRECIO),
                Cantidad = GetIntValue(row, DB_COL_CANTIDAD),
                Descuento = GetDoubleValue(row, DB_COL_DESCUENTO),
                IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO),
                Duracion = GetIntValue(row, DB_COL_DURACION),
                Impuesto = GetIntValue(row, DB_COL_IMPUESTO),
                Tipo = GetIntValue(row, DB_COL_TIPO)
            };

            return producto;
        }

        public BaseEntity BuildObjectServicio(Dictionary<string, object> row)
        {
            var servicio = new Servicio
            {
                Id = GetIntValue(row, DB_COL_ID),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Precio = GetDoubleValue(row, DB_COL_PRECIO),
                Descuento = GetDoubleValue(row, DB_COL_DESCUENTO),
                IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO),
                Duracion = GetIntValue(row, DB_COL_DURACION),
                Impuesto = GetIntValue(row, DB_COL_IMPUESTO),
                Tipo = GetIntValue(row, DB_COL_TIPO)
            };

            return servicio;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            throw new NotImplementedException();
        }

        public List<BaseEntity> BuildObjectsProductos(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var producto = BuildObjectProducto(row);
                lstResults.Add(producto);
            }

            return lstResults;
        }

        public List<BaseEntity> BuildObjectsServicios(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var servicio = BuildObjectServicio(row);
                lstResults.Add(servicio);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_PRODUCTO_SERVICIO_PR" };

            var prodAndServ = (Producto)entity;
            
            operation.AddIntParam(DB_COL_TIPO, prodAndServ.Tipo);
            operation.AddVarcharParam(DB_COL_NOMBRE, prodAndServ.Nombre);
            operation.AddDoubleParam(DB_COL_PRECIO, prodAndServ.Precio);
            operation.AddIntParam(DB_COL_CANTIDAD, prodAndServ.Cantidad);
            operation.AddDoubleParam(DB_COL_DESCUENTO, prodAndServ.Descuento);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, prodAndServ.IdComercio);
            operation.AddIntParam(DB_COL_DURACION, prodAndServ.Duracion);
            operation.AddIntParam(DB_COL_IMPUESTO, prodAndServ.Impuesto);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_PRODUCTO_SERVICIO_PR" };

            var prodAndServ = (Producto)entity;

            operation.AddIntParam(DB_COL_ID, prodAndServ.Id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatementServicios()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_SERVICIO_PR" };
            return operation;
        }

        public SqlOperation GetRetriveAllStatementProductos()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_PRODUCTO_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveStatementProducto(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_PRODUCTO_PR" };

            var prod = (Producto)entity;

            operation.AddIntParam(DB_COL_ID, prod.Id);

            return operation;
        }

        public SqlOperation GetRetriveStatementServicio(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_SERVICIO_PR" };

            var serv = (Servicio)entity;

            operation.AddIntParam(DB_COL_ID, serv.Id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_PRODUCTO_SERVICIO_PR" };

            var pys = (Producto)entity;

            operation.AddIntParam(DB_COL_ID, pys.Id);
            operation.AddIntParam(DB_COL_TIPO, pys.Tipo);
            operation.AddVarcharParam(DB_COL_NOMBRE, pys.Nombre);
            operation.AddDoubleParam(DB_COL_PRECIO, pys.Precio);
            operation.AddIntParam(DB_COL_CANTIDAD, pys.Cantidad);
            operation.AddDoubleParam(DB_COL_DESCUENTO, pys.Descuento);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, pys.IdComercio);
            operation.AddIntParam(DB_COL_DURACION, pys.Duracion);
            operation.AddIntParam(DB_COL_IMPUESTO, pys.Impuesto);

            return operation;
        }
        #endregion
    }
}

