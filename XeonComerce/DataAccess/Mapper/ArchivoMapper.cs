using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class ArchivoMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_Id = "Id";
        private const string DB_COL_Link = "Link";
        private const string DB_COL_Tipo = "Tipo";
        private const string DB_COL_Nommbre = "Nommbre";
        private const string DB_COL_IdComercio = "IdComercio";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_ARCHIVO_PR" };

            var arc = (Archivo)entity;
            operation.AddIntParam(DB_COL_Id, arc.Id);
            operation.AddVarcharParam(DB_COL_Link, arc.Link);
            operation.AddVarcharParam(DB_COL_Tipo, arc.tipo);
            operation.AddVarcharParam(DB_COL_Nommbre, arc.Nommbre);
            operation.AddVarcharParam(DB_COL_IdComercio, arc.IdComercio);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ARCHIVO_PR" };

            var arc = (Archivo)entity;
            operation.AddIntParam(DB_COL_Id, arc.Id);

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
            operation.AddIntParam(DB_COL_Id, arc.Id);
            operation.AddVarcharParam(DB_COL_Link, arc.Link);
            operation.AddVarcharParam(DB_COL_Tipo, arc.tipo);
            operation.AddVarcharParam(DB_COL_Nommbre, arc.Nommbre);
            operation.AddVarcharParam(DB_COL_IdComercio, arc.IdComercio);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ARCHIVO_PR" };

            var arc = (Archivo)entity;
            operation.AddIntParam(DB_COL_Id, arc.Id);
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
                Id = GetIntValue(row, DB_COL_Id),
                Link = GetStringValue(row, DB_COL_Link),
                tipo = GetStringValue(row, DB_COL_Tipo),
                Nommbre = GetStringValue(row, DB_COL_Nommbre),
                IdComercio = GetStringValue(row, DB_COL_IdComercio)
        };

            return archivo;

        }
    }
}
