using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class CategoriaComercioMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_IDCOMERCIO = "ID_COMERCIO";
        private const string DB_COL_IDCATEGORIA = "ID_CATEGORIA";


        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var categoria = new CategoriaComercio
            {
                IdComercio = GetStringValue(row, DB_COL_IDCOMERCIO),
                IdCategoria = GetIntValue(row, DB_COL_IDCATEGORIA)
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
            var operation = new SqlOperation { ProcedureName = "CRE_CATEGORIACOMERCIO_PR" };

            var c = (CategoriaComercio)entity;
            operation.AddIntParam(DB_COL_IDCATEGORIA, c.IdCategoria);
            operation.AddVarcharParam(DB_COL_IDCOMERCIO, c.IdComercio);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CATEGORIACOMERCIO_PR" };
            var c = (CategoriaComercio)entity;
            operation.AddIntParam(DB_COL_IDCATEGORIA, c.IdCategoria);
            operation.AddVarcharParam(DB_COL_IDCOMERCIO, c.IdComercio);
            return operation;
        }

        public SqlOperation GetDeleteAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ALL_CATEGORIACOMERCIO_PR" };
            var c = (CategoriaComercio)entity;
            operation.AddVarcharParam(DB_COL_IDCOMERCIO, c.IdComercio);
            return operation;
        }
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CATEGORIACOMERCIO_PR" };
            return operation;
        }

        public SqlOperation GetRetriveAllCatStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CAT_CATEGORIACOMERCIO_PR" };
            var c = (CategoriaComercio)entity;
            operation.AddVarcharParam(DB_COL_IDCOMERCIO, c.IdComercio);
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CATEGORIACOMERCIO_PR" };
            var c = (CategoriaComercio)entity;
            operation.AddIntParam(DB_COL_IDCATEGORIA, c.IdCategoria);
            operation.AddVarcharParam(DB_COL_IDCOMERCIO, c.IdComercio);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
