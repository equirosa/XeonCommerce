using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class DireccionMapper: EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_Id = "Id";
        private const string DB_COL_Provincia = "Provincia";
        private const string DB_COL_Canton = "Canton";
        private const string DB_COL_Distrito = "Distrito";
        private const string DB_COL_Sennas = "Sennas";
        private const string DB_COL_Latitud = "Latitud";
        private const string DB_COL_Longitud = "Longitud";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_DIRECCION_PR" };

            var dir = (Direccion)entity;
            operation.AddIntParam(DB_COL_Provincia, dir.Provincia);
            operation.AddIntParam(DB_COL_Canton, dir.Canton);
            operation.AddIntParam(DB_COL_Distrito, dir.Distrito);
            operation.AddVarcharParam(DB_COL_Sennas, dir.Sennas);
            operation.AddVarcharParam(DB_COL_Latitud, dir.Latitud);
            operation.AddVarcharParam(DB_COL_Longitud, dir.Longitud);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_DIRECCION_PR" };

            var dir = (Direccion)entity;
            operation.AddIntParam(DB_COL_Id, dir.Id);

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
            operation.AddIntParam(DB_COL_Id, dir.Id);
            operation.AddIntParam(DB_COL_Provincia, dir.Provincia);
            operation.AddIntParam(DB_COL_Canton, dir.Canton);
            operation.AddIntParam(DB_COL_Distrito, dir.Distrito);
            operation.AddVarcharParam(DB_COL_Sennas, dir.Sennas);
            operation.AddVarcharParam(DB_COL_Latitud, dir.Latitud);
            operation.AddVarcharParam(DB_COL_Longitud, dir.Longitud);


            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_DIRECCION_PR" };

            var dir = (Direccion)entity;
            operation.AddIntParam(DB_COL_Id, dir.Id);
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
                Id = GetIntValue(row, DB_COL_Id),
                Provincia = GetIntValue(row, DB_COL_Provincia),
                Canton = GetIntValue(row, DB_COL_Canton),
                Distrito = GetIntValue(row, DB_COL_Distrito),
                Sennas = GetStringValue(row, DB_COL_Sennas),
                Latitud = GetStringValue(row, DB_COL_Latitud),
                Longitud = GetStringValue(row, DB_COL_Longitud)
            };

            return direccion;

        }
    }
}
