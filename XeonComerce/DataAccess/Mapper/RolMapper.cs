using DataAccessLayer.Dao;
using DataAccessLayer.Mapper;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class RolMapper: EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ROL = "ROL";
        private const string DB_COL_DESCRIPCION = "DESCRIPCION";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var rol = new Rol()
            {
                Id = GetIntValue(row, DB_COL_ID),
                rol = GetStringValue(row, DB_COL_ROL),
                Descripcion = GetStringValue(row, DB_COL_DESCRIPCION)
            };
            return rol;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var obj = BuildObject(row);
                lstResults.Add(obj);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation =new SqlOperation { ProcedureName = "CRE_ROL_PR" };
            var o = (Rol)entity;
            operation.AddIntParam(DB_COL_ID, o.Id);
            operation.AddVarcharParam(DB_COL_ROL, o.rol);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, o.Descripcion);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ROL_PR" };
            var o = (Rol)entity;

            operation.AddIntParam(DB_COL_ID, o.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_ROL_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ROL_PR" };
            var o = (Rol)entity;

            operation.AddIntParam(DB_COL_ID, o.Id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_ROL_PR" };
            var o = (Rol)entity;

            operation.AddIntParam(DB_COL_ID, o.Id);
            operation.AddVarcharParam(DB_COL_ROL, o.rol);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, o.Descripcion);

            return operation;
        }
    }
}
