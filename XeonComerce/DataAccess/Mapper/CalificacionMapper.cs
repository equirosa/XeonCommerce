#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
#endregion

namespace DataAccess
{
    public class CalificacionMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        #region properties
        private const string DB_COL_ID = "ID";
        private const string DB_COL_CALIFICACION = "CALIFICACION";
        private const string DB_COL_ID_PRODUCTO = "ID_PRODUCTO";
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        #endregion

        #region methods
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var calificacion = new Calificaciones
            {
                Id = GetIntValue(row, DB_COL_ID),
                Calificacion = GetIntValue(row, DB_COL_CALIFICACION),
                IdProducto = GetIntValue(row, DB_COL_ID_PRODUCTO),
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO)
                
            };

            return calificacion;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var calificacion = BuildObject(row);
                lstResults.Add(calificacion);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CALIFICACION_PR" };

            var cal = (Calificaciones)entity;

            operation.AddIntParam(DB_COL_CALIFICACION, cal.Calificacion);
            operation.AddIntParam(DB_COL_ID_PRODUCTO, cal.IdProducto);
            operation.AddVarcharParam(DB_COL_ID_USUARIO, cal.IdUsuario);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CALIFICACION_PR" };

            var cal = (Calificaciones)entity;

            operation.AddIntParam(DB_COL_ID, cal.Id);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CALIFICACIONES_PR" };
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
        #endregion
    }
}
