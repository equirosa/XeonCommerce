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
    public class CategoriaUsuarioMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        #region properties
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ID_CATEGORIA = "ID_CATEGORIA";
        #endregion

        #region methods
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var categoriaUsuario = new CategoriaUsuario
            {
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO),
                IdCategoria = GetIntValue(row, DB_COL_ID_CATEGORIA)
            };

            return categoriaUsuario;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var catUsuario = BuildObject(row);
                lstResults.Add(catUsuario);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CATEGORIA_USUARIO_PR" };

            var catUsuario = (CategoriaUsuario)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, catUsuario.IdUsuario);
            operation.AddIntParam(DB_COL_ID_CATEGORIA, catUsuario.IdCategoria);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CATEGORIA_USUARIO_PR" };

            var catUsuario = (CategoriaUsuario)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, catUsuario.IdUsuario);
            operation.AddIntParam(DB_COL_ID_CATEGORIA, catUsuario.IdCategoria);

            return operation;
        }

        public SqlOperation GetDeleteAllStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ALL_CATEGORIA_USUARIO_PR" };
            
            var c = (CategoriaUsuario)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, c.IdUsuario);
            
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CATEGORIA_USUARIO_PR" };
            return operation;
        }

        public SqlOperation GetRetriveAllCatStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CAT_CATEGORIAUSUARIO_PR" };

            var catUsuario = (CategoriaUsuario)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, catUsuario.IdUsuario);
            
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CATEGORIA_USUARIO_PR" };

            var catUsuario = (CategoriaUsuario)entity;

            operation.AddVarcharParam(DB_COL_ID_USUARIO, catUsuario.IdUsuario);
            operation.AddIntParam(DB_COL_ID_CATEGORIA, catUsuario.IdCategoria);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}