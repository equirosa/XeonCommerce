using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class HorarioEmpleadoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {

        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_EMPLEADO = "ID_EMPLEADO";
        private const string DB_COL_HORA_INICIO = "HORA_INICIO";
        private const string DB_COL_HORA_FINAL = "HORA_FINAL";
        private const string DB_COL_DIA_SEMANA = "DIA_SEMANA";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_HORARIO_EMPLEADO_PR" };

            var he = (HorarioEmpleado)entity;
            operation.AddIntParam(DB_COL_ID, he.Id);
            operation.AddIntParam(DB_COL_ID_EMPLEADO, he.IdEmpleadoComercioSucursal);
            operation.AddDateTimeParam(DB_COL_HORA_INICIO, he.HoraInicio);
            operation.AddDateTimeParam(DB_COL_HORA_FINAL, he.HoraFinal);
            operation.AddIntParam(DB_COL_DIA_SEMANA, he.DiaSemana);


            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_HORARIO_EMPLEADO_PR" };

            var he = (HorarioEmpleado)entity;
            operation.AddIntParam(DB_COL_ID, he.Id);

            return operation;
        }


        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_HORARIO_EMPLEADO_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_HORARIO_EMPLEADO_PR" };

            var he = (HorarioEmpleado)entity;
            operation.AddIntParam(DB_COL_ID, he.Id);
            operation.AddIntParam(DB_COL_ID_EMPLEADO, he.IdEmpleadoComercioSucursal);
            operation.AddDateTimeParam(DB_COL_HORA_INICIO, he.HoraInicio);
            operation.AddDateTimeParam(DB_COL_HORA_FINAL, he.HoraFinal);
            operation.AddIntParam(DB_COL_DIA_SEMANA, he.DiaSemana);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_HORARIO_EMPLEADO_PR" };

            var he = (HorarioEmpleado)entity;
            operation.AddIntParam(DB_COL_ID, he.Id);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var horarioEmpleado = BuildObject(row);
                lstResults.Add(horarioEmpleado);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var horarioEmpleado = new HorarioEmpleado
            {
                Id = GetIntValue(row, DB_COL_ID),
                IdEmpleadoComercioSucursal = GetIntValue(row, DB_COL_ID_EMPLEADO),
                HoraInicio = GetDateValue(row, DB_COL_HORA_FINAL),
                HoraFinal = GetDateValue(row, DB_COL_HORA_FINAL),
                DiaSemana = GetIntValue(row, DB_COL_DIA_SEMANA)

            };

            return horarioEmpleado;
        }

    }
}
