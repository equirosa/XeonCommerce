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
        private const string DB_COL_ID_CLIENTE = "ID_CLIENTE";
        private const string DB_COL_ID_EMPLEADO_COMERCIO_SUCURSAL = "ID_EMPLEADO_COMERCIO_SUCURSAL";
        private const string DB_COL_ID_FACTURA = "ID_FACTURA";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var cita = new Cita()
            {
                Id = GetIntValue(row, DB_COL_ID),
                HoraInicio = GetDateValue(row, DB_COL_HORA_INICIO),
                HoraFinal = GetDateValue(row, DB_COL_HORA_FINAL),
                Estado = GetStringValue(row, DB_COL_ESTADO),
                IdCliente = GetStringValue(row, DB_COL_ID_CLIENTE),
                IdEmpleadoComercioSucursal = GetIntValue(row, DB_COL_ID_EMPLEADO_COMERCIO_SUCURSAL)
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
            throw new NotImplementedException();
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CITA_PR" };

            var c = (Cita)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
