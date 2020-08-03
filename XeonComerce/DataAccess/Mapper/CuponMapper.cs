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
        public class CuponMapper : EntityMapper, ISqlStaments, IObjectMapper
        {
            #region properties
            private const string DB_COL_ID = "ID_CUPON";
            private const string DB_COL_ID_COMERCIO = "ID_COMERCIO";
            private const string DB_COL_FECHA_EXPIRACION = "FECHA_EXPIRACION";
            private const string DB_COL_VALOR = "VALOR";
            #endregion

            #region methods
            public BaseEntity BuildObject(Dictionary<string, object> row)
            {
                var cupon = new Cupon
                {
                    Id = GetIntValue(row, DB_COL_ID),
                    IdComercio = GetStringValue(row, DB_COL_ID_COMERCIO),
                    FechaExpiracion = GetDateValue(row, DB_COL_FECHA_EXPIRACION),
                    Valor = GetIntValue(row, DB_COL_VALOR)
                };

                return cupon;
            }

            public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
            {
                var lstResults = new List<BaseEntity>();

                foreach (var row in lstRows)
                {
                    var cupon = BuildObject(row);
                    lstResults.Add(cupon);
                }

                return lstResults;
            }

            public SqlOperation GetCreateStatement(BaseEntity entity)
            {
                var operation = new SqlOperation { ProcedureName = "CRE_CUPON_PR" };

                var cpn = (Cupon)entity;

                operation.AddVarcharParam(DB_COL_ID_COMERCIO, cpn.IdComercio);
                operation.AddDateTimeParam(DB_COL_FECHA_EXPIRACION, cpn.FechaExpiracion);
                operation.AddIntParam(DB_COL_VALOR, cpn.Valor);

                return operation;
            }

            public SqlOperation GetDeleteStatement(BaseEntity entity)
            {
                var operation = new SqlOperation { ProcedureName = "DEL_CUPON_PR" };

                var cpn = (Cupon)entity;

                operation.AddIntParam(DB_COL_ID, cpn.Id);
                return operation;
            }

            public SqlOperation GetRetriveAllStatement()
            {
                var operation = new SqlOperation { ProcedureName = "RET_ALL_CUPON_PR" };
                return operation;
            }

            public SqlOperation GetRetriveStatement(BaseEntity entity)
            {
                var operation = new SqlOperation { ProcedureName = "RET_CUPON_PR" };

                var cpn = (Cupon)entity;

                operation.AddIntParam(DB_COL_ID, cpn.Id);

                return operation;
            }

            public SqlOperation GetUpdateStatement(BaseEntity entity)
            {
                var operation = new SqlOperation { ProcedureName = "UPD_CUPON_PR" };

                var cpn = (Cupon)entity;

                operation.AddIntParam(DB_COL_ID, cpn.Id);
                operation.AddVarcharParam(DB_COL_ID_COMERCIO, cpn.IdComercio);
                operation.AddDateTimeParam(DB_COL_FECHA_EXPIRACION, cpn.FechaExpiracion);
                operation.AddIntParam(DB_COL_VALOR, cpn.Valor);

                return operation;
            }
            #endregion
    }
}
