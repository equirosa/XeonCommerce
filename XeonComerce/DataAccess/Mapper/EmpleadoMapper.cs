using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class EmpleadoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_APELLIDO1 = "APELLIDO1";
        private const string DB_COL_APELLIDO2 = "APELLIDO2";
        private const string DB_COL_GENERO = "GENERO";
        private const string DB_COL_FECHA_NACIMIENTO = "FECHA_NACIMIENTO";
        private const string DB_COL_CORREO_ELECTRONICO = "CORREO_ELECTRONICO";
        private const string DB_COL_TELEFONO = "NUMERO_TELEFONO";
        private const string DB_COL_ID_DIRECCION = "ID_DIRECCION";
        private const string DB_COL_ESTADO = "ESTADO";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
        private const string DB_COL_ID_SUCURSAL = "ID_SUCURSAL";
        private const string DB_COL_ID_EMPLEADO = "ID_EMPLEADO";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            return null; 
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            return null;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            return null; 
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            return null;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            return null;
        }

     

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var cuenta = BuildObject(row);
                lstResults.Add(cuenta);
            }

            return lstResults;
        }
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {

            var empleado = new Empleado
            {
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                ApellidoUno = GetStringValue(row, DB_COL_APELLIDO1),
                ApellidoDos = GetStringValue(row, DB_COL_APELLIDO2),
                Genero = GetStringValue(row, DB_COL_GENERO),
                FechaNacimiento = GetDateValue(row, DB_COL_FECHA_NACIMIENTO),
                CorreoElectronico = GetStringValue(row, DB_COL_CORREO_ELECTRONICO),
                NumeroTelefono = GetStringValue(row, DB_COL_TELEFONO),
                IdDireccion = GetIntValue(row, DB_COL_ID_DIRECCION),
                Estado = GetStringValue(row, DB_COL_ESTADO),
                IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO),
                IdSucursal = GetStringValue(row, DB_COL_ID_SUCURSAL),
                IdEmpleado = GetIntValue(row, DB_COL_ID_EMPLEADO)
            };

            return empleado;
        }


        public SqlOperation GetEmpleadosByIdSucursal(string idSucursal)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_EMPLEADOS_ID_SUCURSAL_PR" };

            operation.AddVarcharParam(DB_COL_ID_SUCURSAL, idSucursal);
            return operation;
        }

       
    }
}
