using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Text;

namespace DataAccess.Mapper
{
    public class EspecialidadMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_ID_ROL = "ID_ROL";
        private const string DB_COL_ID_SERVICIO = "ID_SERVICIO";


        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_ESPECIALIDAD_PR" };
            var e = (Especialidad)entity;
                        
            operation.AddIntParam(DB_COL_ID_ROL, e.IdRol);
            operation.AddIntParam(DB_COL_ID_SERVICIO, e.IdServicio);

            return operation;

        }

        public SqlOperation GetDeleteEspecialidadXServicio(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ESPECIALIDAD_SERVICIO_PR" };
            var s = (Producto)entity;

            operation.AddIntParam(DB_COL_ID_SERVICIO, s.Id);

            return operation; 
        }

        public SqlOperation GetDeleteEspecialidadXRol(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ESPECIALIDAD_ROL_PR" };
            var r = (Rol)entity;

            operation.AddIntParam(DB_COL_ID_ROL, r.Id);

            return operation;
        }

        public SqlOperation GetEspecialidadRol(int rol)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ESPECIALIDAD_ROL_PR" };
            operation.AddIntParam(DB_COL_ID_ROL, rol);

            return operation; 
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
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
            var especialidad = new Especialidad()
            {
                Id = GetIntValue(row, DB_COL_ID),
                IdRol = GetIntValue(row, DB_COL_ID_ROL),
                IdServicio = GetIntValue(row, DB_COL_ID_SERVICIO)
            };
            return especialidad;
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

      

    }
}
