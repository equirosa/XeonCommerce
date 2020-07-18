<<<<<<< HEAD
﻿using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace DataAccess.Dao
=======
﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DataAccessLayer.Dao
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
{
    public class SqlOperation
    {
        public string ProcedureName { get; set; }
<<<<<<< HEAD
        public List<SqlParameter> Parameters { get; set; }

        public SqlOperation()
        {
            Parameters = new List<SqlParameter>();
=======
        public List<SqlParameter> Parameters { get; set;}

        public SqlOperation()
        {
            Parameters=new List<SqlParameter>();
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
        }

        public void AddVarcharParam(string paramName, string paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.VarChar)
            {
<<<<<<< HEAD
                Value = paramValue
=======
                Value = paramValue                            
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
            };
            Parameters.Add(param);
        }

        public void AddIntParam(string paramName, int paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Int)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }

        public void AddDoubleParam(string paramName, double paramValue)
        {
<<<<<<< HEAD
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Decimal)
=======
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Float)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }
        public void AddDateTimeParam(string paramName, DateTime paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.DateTime)
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }
    }
}
