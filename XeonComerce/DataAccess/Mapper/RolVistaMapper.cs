using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class RolVistaMapper: EntityMapper, ISqlStaments, IObjectMapper
    {

        private const string DB_COL_ID_ROL = "ID_ROL";
        private const string DB_COL_ID_VISTA = "ID_VISTA";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_ROL_VISTA_PR" };
            var rv = (RolVista)entity;

            operation.AddIntParam(DB_COL_ID_ROL, rv.IdRol);
            operation.AddIntParam(DB_COL_ID_VISTA, rv.IdVista);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ROL_VISTA_PR" };
            var rv = (RolVista)entity;

            operation.AddIntParam(DB_COL_ID_ROL, rv.IdRol);
            operation.AddIntParam(DB_COL_ID_VISTA, rv.IdVista);

            return operation;
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

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var rolVista = new RolVista()
            {
                IdRol = GetIntValue(row, DB_COL_ID_ROL),
                IdVista = GetIntValue(row, DB_COL_ID_VISTA)             
            };
            return rolVista;
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

        public SqlOperation GetVistasRol(int rol)
        {
            var operation = new SqlOperation { ProcedureName = "RET_VISTAS_ID_ROL_PR" };
            
            operation.AddIntParam(DB_COL_ID_ROL, rol);

            return operation;
        }

        public SqlOperation DeleteByRol(int rol)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ROL_VISTA_ID_ROL" };
            operation.AddIntParam(DB_COL_ID_ROL, rol);
            return operation;
        }
    }
}
