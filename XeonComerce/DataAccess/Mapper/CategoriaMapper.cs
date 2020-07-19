using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class CategoriaMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_VALOR = "VALOR";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var categoria = new Categoria
            {
                Id = GetIntValue(row, DB_COL_ID),
                Valor = GetStringValue(row, DB_COL_VALOR)
            };

            return categoria;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach(var row in lstRows)
            {
                lstResults.Add(BuildObject(row));
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CATEGORIA_PR" };

            var c = (Categoria)entity;
            operation.AddVarcharParam(DB_COL_VALOR, c.Valor);
            // TODO: determinar si es necesario tambien agregar el Id de la categoria a crear
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CATEGORIA_PR" };
            var c = (Categoria)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CATEGORIA_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CATEGORIA_PR" };
            var c = (Categoria)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CATEGORIA_PR" };
            var c = (Categoria)entity;
            operation.AddIntParam(DB_COL_ID, c.Id);
            operation.AddVarcharParam(DB_COL_VALOR, c.Valor);
            return operation;
        }
    }
}
