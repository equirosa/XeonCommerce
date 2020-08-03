using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class DiaFeriadoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_FECHA = "FECHA";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_DESCRIPCION = "DESCRIPCION";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_DIA_FERIADO_PR" };

            var e = (DiaFeriado)entity;
            operation.AddDateTimeParam(DB_COL_FECHA, e.Fecha);
            operation.AddVarcharParam(DB_COL_NOMBRE, e.Nombre);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, e.Descripcion);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_DIA_FERIADO_PR" };

            var e = (DiaFeriado)entity;
            operation.AddIntParam(DB_COL_ID, e.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_DIA_FERIADO_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_DIA_FERIADO_PR" };

            var e = (DiaFeriado)entity;
            operation.AddIntParam(DB_COL_ID, e.Id);
            operation.AddDateTimeParam(DB_COL_FECHA, e.Fecha);
            operation.AddVarcharParam(DB_COL_NOMBRE, e.Nombre);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, e.Descripcion);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_DIA_FERIADO_PR" };

            var e = (DiaFeriado)entity;
            operation.AddIntParam(DB_COL_ID, e.Id);
            return operation;
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
            var obj = new DiaFeriado
            {
                Id = GetIntValue(row, DB_COL_ID),
                Fecha = GetDateValue(row, DB_COL_FECHA),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Descripcion = GetStringValue(row, DB_COL_DESCRIPCION)
        };

            return obj;

        }
    }
}
