using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class CitaMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_HORA_INICIO = "HORA_INICIO";
        private const string DB_COL_HORA_FINAL = "HORA_FINAL";
        private const string DB_COL_ESTADO = "ESTADO";
        private const string DB_COL_TIPO = "TIPO";
        private const string DB_COL_ID_CLIENTE = "ID_CLIENTE";
        private const string DB_COL_ID_EMPLEADO_COMERCIO_SUCURSAL = "ID_EMPLEADO_COMERCIO_SUCURSAL";
        private const string DB_COL_ID_FACTURA = "ID_FACTURA";
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var cita = new Cita()
            {
                Id = GetIntValue(row, DB_COL_ID),
                HoraInicio = GetDateValue(row, DB_COL_HORA_INICIO),
                HoraFinal = GetDateValue(row, DB_COL_HORA_FINAL),
                Estado = GetStringValue(row, DB_COL_ESTADO),
                Tipo = GetStringValue(row, DB_COL_TIPO),
                IdCliente = GetStringValue(row, DB_COL_ID_CLIENTE),
                IdEmpleadoComercioSucursal = GetIntValue(row, DB_COL_ID_EMPLEADO_COMERCIO_SUCURSAL),
                IdFactura = GetIntValue(row, DB_COL_ID_FACTURA),
                IdSucursal = GetStringValue(row, DB_COL_ID_SUCURSAL),
                IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO)
            };
            return cita;
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

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CITA_PR" };

            var c = (Cita)entity;
            operation.AddDateTimeParam(DB_COL_HORA_INICIO, c.HoraInicio);
            operation.AddDateTimeParam(DB_COL_HORA_FINAL, c.HoraFinal);
            operation.AddVarcharParam(DB_COL_ESTADO, c.Estado);
            operation.AddVarcharParam(DB_COL_TIPO, c.Tipo);
            operation.AddVarcharParam(DB_COL_ID_CLIENTE, c.IdCliente);
            operation.AddIntParam(DB_COL_ID_EMPLEADO_COMERCIO_SUCURSAL, c.IdEmpleadoComercioSucursal);
            operation.AddIntParam(DB_COL_ID_FACTURA, c.IdFactura );
            operation.AddVarcharParam(DB_COL_ID_SUCURSAL, c.IdSucursal);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CITA_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CITA_PR" };

            var c = (Cita)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);

            return operation;
        }

        public SqlOperation GetRetrieveUltimo()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ULT_CITA_PR" };
            return operation; 
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
