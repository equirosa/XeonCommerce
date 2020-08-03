using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class ComercioMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_CED_JURIDICA = "CED_JURIDICA";
        private const string DB_COL_NOMBRE_COMERCIAL = "NOMBRE_COMERCIAL";
        private const string DB_COL_CORREO_ELECTRONICO = "CORREO_ELECTRONICO";
        private const string DB_COL_TELEFONO = "TELEFONO";
        private const string DB_COL_ID_DIRECCION = "ID_DIRECCION";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ESTADO = "ESTADO";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_COMERCIO_PR" };

            var c = (Comercio)entity;
            operation.AddVarcharParam(DB_COL_CED_JURIDICA, c.CedJuridica);
            operation.AddVarcharParam(DB_COL_NOMBRE_COMERCIAL, c.NombreComercial);
            operation.AddVarcharParam(DB_COL_CORREO_ELECTRONICO, c.CorreoElectronico);
            operation.AddVarcharParam(DB_COL_TELEFONO, c.Telefono);
            operation.AddIntParam(DB_COL_ID_DIRECCION, c.Direccion);
            operation.AddVarcharParam(DB_COL_ID_USUARIO, c.IdUsuario);
            operation.AddVarcharParam(DB_COL_ESTADO, c.Estado);
            return operation;
        }


        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_COMERCIO_PR" };

            var c = (Comercio)entity;
            operation.AddVarcharParam(DB_COL_CED_JURIDICA, c.CedJuridica);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_COMERCIO_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_COMERCIO_PR" };

            var c = (Comercio)entity;
            operation.AddVarcharParam(DB_COL_CED_JURIDICA, c.CedJuridica);
            operation.AddVarcharParam(DB_COL_NOMBRE_COMERCIAL, c.NombreComercial);
            operation.AddVarcharParam(DB_COL_CORREO_ELECTRONICO, c.CorreoElectronico);
            operation.AddVarcharParam(DB_COL_TELEFONO, c.Telefono);
            operation.AddIntParam(DB_COL_ID_DIRECCION, c.Direccion);
            operation.AddVarcharParam(DB_COL_ID_USUARIO, c.IdUsuario);
            operation.AddVarcharParam(DB_COL_ESTADO, c.Estado);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_COMERCIO_PR" };

            var c = (Comercio)entity;
            operation.AddVarcharParam(DB_COL_CED_JURIDICA, c.CedJuridica);
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
            var comercio = new Comercio
            {
                CedJuridica = GetStringValue(row, DB_COL_CED_JURIDICA),
                NombreComercial = GetStringValue(row, DB_COL_NOMBRE_COMERCIAL),
                CorreoElectronico = GetStringValue(row, DB_COL_CORREO_ELECTRONICO),
                Telefono = GetStringValue(row, DB_COL_TELEFONO),
                Direccion = GetIntValue(row, DB_COL_ID_DIRECCION),
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO),
                Estado = GetStringValue(row, DB_COL_ESTADO)
            };

            return comercio;
        }

    }
}
