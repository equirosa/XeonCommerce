using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class SucursalMapper: EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_Id = "Id";
        private const string DB_COL_IdDireccion = "IdDireccion";
        private const string DB_COL_IdComercio = "IdComercio";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_SUCURSAL_PR" };

            var suc = (Sucursal)entity;
            operation.AddIntParam(DB_COL_Id, suc.Id);
            operation.AddIntParam(DB_COL_IdDireccion, suc.IdDireccion);
            operation.AddVarcharParam(DB_COL_IdComercio, suc.IdComercio);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_SUCURSAL_PR" };

            var suc = (Sucursal)entity;
            operation.AddIntParam(DB_COL_Id, suc.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_SUCURSAL_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_SUCURSAL_PR" };

            var suc = (Sucursal)entity;
            operation.AddIntParam(DB_COL_Id, suc.Id);
            operation.AddIntParam(DB_COL_IdDireccion, suc.IdDireccion);
            operation.AddVarcharParam(DB_COL_IdComercio, suc.IdComercio);


            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_SUCURSAL_PR" };

            var suc = (Sucursal)entity;
            operation.AddIntParam(DB_COL_Id, suc.Id);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var sucursal = BuildObject(row);
                lstResults.Add(sucursal);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var sucursal = new Sucursal
            {
                Id = GetIntValue(row, DB_COL_Id),
                IdDireccion = GetIntValue(row, DB_COL_IdDireccion),
                IdComercio = GetStringValue(row, DB_COL_IdComercio)
            };

            return sucursal;

        }

    }
}
