using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class ArchivoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_LINK = "LINK";
        private const string DB_COL_TIPO = "TIPO";
        private const string DB_COL_NOMBRE = "NOMBRE";
        private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_ARCHIVO_PR" };

            var arc = (Archivo)entity;
            operation.AddVarcharParam(DB_COL_LINK, arc.Link);
            operation.AddVarcharParam(DB_COL_TIPO, arc.Tipo);
            operation.AddVarcharParam(DB_COL_NOMBRE, arc.Nombre);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, arc.IdComercio);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ARCHIVO_PR" };

            var arc = (Archivo)entity;
            operation.AddIntParam(DB_COL_ID, arc.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_ARCHIVO_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_ARCHIVO_PR" };

            var arc = (Archivo)entity;
            operation.AddIntParam(DB_COL_ID, arc.Id);
            operation.AddVarcharParam(DB_COL_LINK, arc.Link);
            operation.AddVarcharParam(DB_COL_TIPO, arc.Tipo);
            operation.AddVarcharParam(DB_COL_NOMBRE, arc.Nombre);
            operation.AddVarcharParam(DB_COL_ID_COMERCIO, arc.IdComercio);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ARCHIVO_PR" };

            var arc = (Archivo)entity;
            operation.AddIntParam(DB_COL_ID, arc.Id);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var archivo = BuildObject(row);
                lstResults.Add(archivo);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var archivo = new Archivo
            {
                Id = GetIntValue(row, DB_COL_ID),
                Link = GetStringValue(row, DB_COL_LINK),
                Tipo = GetStringValue(row, DB_COL_TIPO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO)
        };

            return archivo;

        }
    }
}
