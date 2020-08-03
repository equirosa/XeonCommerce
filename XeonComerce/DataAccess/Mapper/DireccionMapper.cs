using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class DireccionMapper: EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_PROVINCIA = "PROVINCIA";
        private const string DB_COL_CANTON = "CANTON";
        private const string DB_COL_DISTRITO = "DISTRITO";
        private const string DB_COL_SENNAS = "SENNAS";
        private const string DB_COL_LATITUD = "LATITUD";
        private const string DB_COL_LONGITUD = "LONGITUD";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_DIRECCION_PR" };

            var dir = (Direccion)entity;
            operation.AddIntParam(DB_COL_PROVINCIA, dir.Provincia);
            operation.AddIntParam(DB_COL_CANTON, dir.Canton);
            operation.AddIntParam(DB_COL_DISTRITO, dir.Distrito);
            operation.AddVarcharParam(DB_COL_SENNAS, dir.Sennas);
            operation.AddVarcharParam(DB_COL_LATITUD, dir.Latitud);
            operation.AddVarcharParam(DB_COL_LONGITUD, dir.Longitud);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_DIRECCION_PR" };

            var dir = (Direccion)entity;
            operation.AddIntParam(DB_COL_ID, dir.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_DIRECCION_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_DIRECCION_PR" };

            var dir = (Direccion)entity;
            operation.AddIntParam(DB_COL_ID, dir.Id);
            operation.AddIntParam(DB_COL_PROVINCIA, dir.Provincia);
            operation.AddIntParam(DB_COL_CANTON, dir.Canton);
            operation.AddIntParam(DB_COL_DISTRITO, dir.Distrito);
            operation.AddVarcharParam(DB_COL_SENNAS, dir.Sennas);
            operation.AddVarcharParam(DB_COL_LATITUD, dir.Latitud);
            operation.AddVarcharParam(DB_COL_LONGITUD, dir.Longitud);


            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_DIRECCION_PR" };

            var dir = (Direccion)entity;
            operation.AddIntParam(DB_COL_ID, dir.Id);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var direccion = BuildObject(row);
                lstResults.Add(direccion);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var direccion = new Direccion
            {
                Id = GetIntValue(row, DB_COL_ID),
                Provincia = GetIntValue(row, DB_COL_PROVINCIA),
                Canton = GetIntValue(row, DB_COL_CANTON),
                Distrito = GetIntValue(row, DB_COL_DISTRITO),
                Sennas = GetStringValue(row, DB_COL_SENNAS),
                Latitud = GetStringValue(row, DB_COL_LATITUD),
                Longitud = GetStringValue(row, DB_COL_LONGITUD)
            };

            return direccion;

        }
    }
}
