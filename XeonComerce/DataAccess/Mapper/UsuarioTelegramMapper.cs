using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public class UsuarioTelegramMapper : EntityMapper, IObjectMapper, ISqlStaments
    {
        private const string DB_COL_ID_USUARIO = "ID_USUARIO";
        private const string DB_COL_ID_CHAT = "ID_CHAT";


        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var usuarioTelegram = new UsuarioTelegram
            {
                IdUsuario = GetStringValue(row, DB_COL_ID_USUARIO),
                IdChat = GetStringValue(row, DB_COL_ID_CHAT)
            };

            return usuarioTelegram;
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
            var operation = new SqlOperation { ProcedureName = "CRE_USUARIO_TELEGRAM_PR" };

            var c = (UsuarioTelegram)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, c.IdUsuario);
            operation.AddVarcharParam(DB_COL_ID_CHAT, c.IdChat);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_USUARIO_TELEGRAM_PR" };
            var c = (UsuarioTelegram)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, c.IdUsuario);
            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_USUARIO_TELEGRAM_PR" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_USUARIO_TELEGRAM_PR" };
            var c = (UsuarioTelegram)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, c.IdUsuario);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_USUARIO_TELEGRAM_PR" };
            var c = (UsuarioTelegram)entity;
            operation.AddVarcharParam(DB_COL_ID_USUARIO, c.IdUsuario);
            operation.AddVarcharParam(DB_COL_ID_CHAT, c.IdChat);
            return operation;
        }
    }
}
