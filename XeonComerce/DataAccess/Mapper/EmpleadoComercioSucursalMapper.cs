using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class EmpleadoComercioSucursalMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";
        private const string DB_COL_ESTADO = "ESTADO";
        private const string DB_COL_ID_ROL = "ID_ROL";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_EMPLEADO_COMERICO_SUCURSAL_PR" };

            var ecs = (EmpleadoComercioSucursal)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, ecs.IdUsuario);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, ecs.IdComercio);
            operation.AddVarcharParam(DB_COL_ID_SUCURSAL, ecs.IdSucursal);
            operation.AddVarcharParam(DB_COL_ESTADO, ecs.Estado);
            operation.AddIntParam(DB_COL_ID_ROL, ecs.IdRol);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_EMPLEADO_COMERICO_SUCURSAL_PR" };

            var ecs = (EmpleadoComercioSucursal)entity;
            operation.AddIntParam(DB_COL_ID, ecs.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_EMPLEADO_COMERCIO_SUCURSAL_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_EMPLEADO_COMERICO_SUCURSAL_PR" };

            var ecs = (EmpleadoComercioSucursal)entity;
            operation.AddIntParam(DB_COL_ID, ecs.Id);            
            operation.AddIntParam(DB_COL_ID_ROL, ecs.IdRol);


            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_EMPLEADO_COMERCIO_SUCURSAL_PR" };

            var ecs = (EmpleadoComercioSucursal)entity;
            operation.AddIntParam(DB_COL_ID, ecs.Id);
            return operation;
        }

     
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var empleadoComercioSucursal = BuildObject(row);
                lstResults.Add(empleadoComercioSucursal);
            }

            return lstResults;
        }
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {

            var empleadoComercioSucursal = new EmpleadoComercioSucursal
            {
                Id = GetIntValue(row, DB_COL_ID),
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO),
                IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO),
                IdSucursal = GetStringValue(row, DB_COL_ID_SUCURSAL),
                IdRol = GetIntValue(row, DB_COL_ID_ROL)
            };

            return empleadoComercioSucursal;
        }

    }
}
