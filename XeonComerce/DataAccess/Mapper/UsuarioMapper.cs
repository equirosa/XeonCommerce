using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class UsuarioMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_APELLIDO1 = "APELLIDO1";
        private const string DB_COL_APELLIDO2 = "APELLIDO2";
        private const string DB_COL_GENERO = "GENERO";
        private const string DB_COL_FECHA_NACIMIENTO = "FECHA_NACIMIENTO";
        private const string DB_COL_CORREO_ELECTRONICO = "CORREO_ELECTRONICO";
        private const string DB_COL_TELEFONO = "NUMERO_TELEFONO";
        private const string DB_COL_ID_DIRECCION = "ID_DIRECCION";
        private const string DB_COL_ESTADO = "ESTADO";
        private const string DB_COL_TOKEN = "TOKEN";
        private const string DB_COL_TIPO = "TIPO";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_USUARIO_PR" };

            var c = (Usuario)entity;
            operation.AddVarcharParam(DB_COL_ID, c.Id);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);
            operation.AddVarcharParam(DB_COL_APELLIDO1, c.ApellidoUno);
            operation.AddVarcharParam(DB_COL_APELLIDO2, c.ApellidoDos);
            operation.AddVarcharParam(DB_COL_GENERO, c.Genero);
            operation.AddDateTimeParam(DB_COL_FECHA_NACIMIENTO, c.FechaNacimiento);
            operation.AddVarcharParam(DB_COL_CORREO_ELECTRONICO, c.CorreoElectronico);
            operation.AddVarcharParam(DB_COL_TELEFONO, c.NumeroTelefono);
            operation.AddIntParam(DB_COL_ID_DIRECCION, c.IdDireccion);
            operation.AddVarcharParam(DB_COL_ESTADO, c.Estado);
            operation.AddVarcharParam(DB_COL_TIPO, c.Tipo);
            return operation;
        }

        internal SqlOperation UpdateToAdmin(Usuario usuario)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_TOADMIN_PR" };

            var c = usuario;
            operation.AddVarcharParam(DB_COL_ID, c.Id);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);
            operation.AddVarcharParam(DB_COL_APELLIDO1, c.ApellidoUno);
            operation.AddVarcharParam(DB_COL_APELLIDO2, c.ApellidoDos);
            operation.AddVarcharParam(DB_COL_GENERO, c.Genero);
            operation.AddDateTimeParam(DB_COL_FECHA_NACIMIENTO, c.FechaNacimiento);
            operation.AddVarcharParam(DB_COL_CORREO_ELECTRONICO, c.CorreoElectronico);
            operation.AddVarcharParam(DB_COL_TELEFONO, c.NumeroTelefono);
            operation.AddIntParam(DB_COL_ID_DIRECCION, c.IdDireccion);
            operation.AddVarcharParam(DB_COL_ESTADO, c.Estado);
            operation.AddVarcharParam(DB_COL_TIPO, "A");

            return operation;
        }

        internal SqlOperation Verification(BaseEntity user)
        {
            var operation = new SqlOperation { ProcedureName = "MAIL_VERIFICATION" };
            var u = (Usuario)user;

            operation.AddVarcharParam(DB_COL_ID, u.Id);
            operation.AddVarcharParam(DB_COL_TOKEN, u.Token);
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_USUARIO_PR" };

            var c = (Usuario)entity;
            operation.AddVarcharParam(DB_COL_ID, c.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_USUARIO_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_USUARIO_PR" };

            var c = (Usuario)entity;
            operation.AddVarcharParam(DB_COL_ID, c.Id);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);
            operation.AddVarcharParam(DB_COL_APELLIDO1, c.ApellidoUno);
            operation.AddVarcharParam(DB_COL_APELLIDO2, c.ApellidoDos);
            operation.AddVarcharParam(DB_COL_GENERO, c.Genero);
            operation.AddDateTimeParam(DB_COL_FECHA_NACIMIENTO, c.FechaNacimiento);
            operation.AddVarcharParam(DB_COL_CORREO_ELECTRONICO, c.CorreoElectronico);
            operation.AddVarcharParam(DB_COL_TELEFONO, c.NumeroTelefono);
            operation.AddIntParam(DB_COL_ID_DIRECCION, c.IdDireccion);
            operation.AddVarcharParam(DB_COL_ESTADO, c.Estado);
            operation.AddVarcharParam(DB_COL_TIPO, c.Tipo);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_USUARIO_PR" };

            var c = (Usuario)entity;
            operation.AddVarcharParam(DB_COL_ID, c.Id);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var comercio = BuildObject(row);
                lstResults.Add(comercio);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var comercio = new Usuario
            {
                Id = GetStringValue(row, DB_COL_ID),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                ApellidoUno = GetStringValue(row, DB_COL_APELLIDO1),
                ApellidoDos = GetStringValue(row, DB_COL_APELLIDO2),
                Genero = GetStringValue(row,DB_COL_GENERO),
                FechaNacimiento = GetDateValue(row, DB_COL_FECHA_NACIMIENTO),
                CorreoElectronico = GetStringValue(row, DB_COL_CORREO_ELECTRONICO),
                NumeroTelefono = GetStringValue(row, DB_COL_TELEFONO),
                IdDireccion = GetIntValue(row, DB_COL_ID_DIRECCION),
                Estado = GetStringValue(row, DB_COL_ESTADO),
                Token = GetStringValue(row,DB_COL_TOKEN),
                Tipo = GetStringValue(row, DB_COL_TIPO)
            };

            return comercio;
        }

    }
}
