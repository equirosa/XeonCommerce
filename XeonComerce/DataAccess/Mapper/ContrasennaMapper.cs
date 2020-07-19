using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class ContrasennaMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_CONTRASENNA = "CONTRASENNA";
        private const string DB_COL_ESTADO = "ESTADO";
        private const string DB_COL_FECHA_ACTUALIZACION = "FECHA_ACTUALIZACION";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CONTRASENNA_PR" };

            var c = (Contrasenna)entity;
            operation.AddVarcharParam(DB_COL_CONTRASENNA, c.contrasenna);
            operation.AddVarcharParam(DB_COL_ESTADO, c.estado);
            operation.AddDateTimeParam(DB_COL_FECHA_ACTUALIZACION, c.FechaActualizacion);
            operation.AddVarcharParam(DB_COL_ID_USUARIO, c.IdUsuario);
            return operation;
        }


        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CONTRASENNA_PR" };

            var c = (Contrasenna)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CONTRASENNA_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_CONTRASENNA_PR" };

            var c = (Contrasenna)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            operation.AddVarcharParam(DB_COL_CONTRASENNA, c.contrasenna);
            operation.AddVarcharParam(DB_COL_ESTADO, c.estado);
            operation.AddDateTimeParam(DB_COL_FECHA_ACTUALIZACION, c.FechaActualizacion);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CONTRASENNA_PR" };

            var c = (Contrasenna)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var contrasenna = BuildObject(row);
                lstResults.Add(contrasenna);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var contrasenna = new Contrasenna
            {
                Id = GetIntValue(row, DB_COL_ID),
                contrasenna = GetStringValue(row, DB_COL_CONTRASENNA),
                estado = GetStringValue(row, DB_COL_ESTADO),
                FechaActualizacion = GetDateValue(row, DB_COL_FECHA_ACTUALIZACION),
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO)
            };

            return contrasenna;
        }

    }
}
