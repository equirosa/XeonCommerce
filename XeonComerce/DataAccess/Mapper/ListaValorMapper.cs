using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccess.Mapper
{
    public class ListaValorMapper: EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID_LISTA = "ID_LISTA";
        private const string DB_COL_ID_VALOR = "ID_VALOR";
        private const string DB_COL_VALOR = "VALOR";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var listaValor = new ListaValor()
            {
                IdLista = GetIntValue(row, DB_COL_ID_LISTA),
                IdValor = GetIntValue(row, DB_COL_ID_VALOR),
                valor = GetStringValue(row, DB_COL_VALOR)
            };
            return listaValor;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var listaValor = BuildObject(row);
                lstResults.Add(listaValor);
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
            var operation = new SqlOperation { ProcedureName = "RET_ALL_LISTAVALOR_PR" };
            return operation;
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
