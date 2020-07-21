using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class HorarioSucursalMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";
        private const string DB_COL_HORA_INICIO = "HORA_INICIO";
        private const string DB_COL_HORA_FINAL = "HORA_FINAL";
        private const string DB_COL_DIA_SEMANA = "DIA_SEMANA";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_HORARIO_SUCURSAL_PR" };

            var hs = (HorarioSucursal)entity;
            operation.AddIntParam(DB_COL_ID, hs.Id);
            operation.AddVarcharParam(DB_COL_ID_SUCURSAL, hs.IdSucursal);
            operation.AddDateTimeParam(DB_COL_HORA_INICIO, hs.HoraInicio);
            operation.AddDateTimeParam(DB_COL_HORA_FINAL, hs.HoraFinal);
            operation.AddIntParam(DB_COL_DIA_SEMANA, hs.DiaSemana);


            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_HORARIO_SUCURSAL_PR" };

            var hs = (HorarioSucursal)entity;
            operation.AddIntParam(DB_COL_ID, hs.Id);

            return operation;
        }


        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_HORARIO_SUCURSAL_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_HORARIO_SUCURSAL_PR" };

            var hs = (HorarioSucursal)entity;
            operation.AddIntParam(DB_COL_ID, hs.Id);
            operation.AddVarcharParam(DB_COL_ID_SUCURSAL, hs.IdSucursal);
            operation.AddDateTimeParam(DB_COL_HORA_INICIO, hs.HoraInicio);
            operation.AddDateTimeParam(DB_COL_HORA_FINAL, hs.HoraFinal);
            operation.AddIntParam(DB_COL_DIA_SEMANA, hs.DiaSemana);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_HORARIO_SUCURSAL_PR" };

            var hs = (HorarioSucursal)entity;
            operation.AddIntParam(DB_COL_ID, hs.Id);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var horarioSucursal = BuildObject(row);
                lstResults.Add(horarioSucursal);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var horarioEmpleado = new HorarioSucursal
            {
                Id = GetIntValue(row, DB_COL_ID),
                IdSucursal = GetStringValue(row, DB_COL_ID_SUCURSAL),
                HoraInicio = GetDateValue(row, DB_COL_HORA_FINAL),
                HoraFinal = GetDateValue(row, DB_COL_HORA_FINAL),
                DiaSemana = GetIntValue(row, DB_COL_DIA_SEMANA)

            };

            return horarioEmpleado;
        }
    }
}
