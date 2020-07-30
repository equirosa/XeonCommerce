using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class BitacoraMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_DETALLE = "DETALLE";
        private const string DB_COL_ACCION = "ACCION";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_BITACORA_PR" };

            var e = (Bitacora)entity;
            operation.AddDateTimeParam(DB_COL_FECHA, e.Fecha);
            operation.AddVarcharParam(DB_COL_DETALLE, e.Detalle);
            operation.AddVarcharParam(DB_COL_ACCION, e.Accion);
            operation.AddVarcharParam(DB_COL_ID_USUARIO, e.IdUsuario);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_BITACORA_PR" };

            var e = (Bitacora)entity;
            operation.AddIntParam(DB_COL_ID, e.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_BITACORA_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var obj = BuildObject(row);
                lstResults.Add(obj);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var bitacora = new Bitacora
            {
                Id = GetIntValue(row, DB_COL_ID),
                Fecha = GetDateValue(row, DB_COL_FECHA),
                Detalle = GetStringValue(row, DB_COL_DETALLE),
                Accion = GetStringValue(row, DB_COL_ACCION),
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO)
            };

            return bitacora;

        }
    }
}
