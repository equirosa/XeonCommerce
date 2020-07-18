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
                Id = getIntValue(row, DB_COL_ID),
                Valor = getStringValue(row, DB_COL_VALOR)
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
            throw new NotImplementedException();
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
