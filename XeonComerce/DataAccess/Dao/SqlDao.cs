using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Microsoft.Extensions.Configuration;

namespace DataAccess.Dao
{
    public class SqlDao
    {

        private string CONNECTION_STRING = "";

        private static SqlDao instance;

        private SqlDao()
        {
            //var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            // CONNECTION_STRING = builder.Build().GetSection("ConnectionStrings").GetSection("CONN_STRING").Value;

            //CONNECTION_STRING = ConfigurationManager.ConnectionStrings["CONN_STRING"].ConnectionString;

            //CONNECTION_STRING = @"Data Source=.\SQLExpress;Initial Catalog=PROY_2;Integrated Security=True";

            CONNECTION_STRING = "Data Source=xeonsquad.database.windows.net;Initial Catalog=XeonSquad;Persist Security Info=True;User ID=proyectoxeonsquad;Password=XeonSquad2020";//ConfigurationManager.ConnectionStrings["CONN_STRING"].ConnectionString;

        }

        //IMPLEMENTA EL PATRON LLAMADO SINGLETON
        //INVESTIGAR EL PATRON
        public static SqlDao GetInstance()
        {
            if (instance == null)
                instance = new SqlDao();

            return instance;
        }

        public void ExecuteProcedure(SqlOperation sqlOperation)
        {
            using (var conn = new SqlConnection(CONNECTION_STRING))
            using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            })
            {
                foreach (var param in sqlOperation.Parameters)
                {
                    command.Parameters.Add(param);
                }

                conn.Open();
                command.ExecuteNonQuery();
            }
        }

        public List<Dictionary<string, object>> ExecuteQueryProcedure(SqlOperation sqlOperation)
        {
            var lstResult = new List<Dictionary<string, object>>();

            using (var conn = new SqlConnection(CONNECTION_STRING))
            using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            })
            {
                foreach (var param in sqlOperation.Parameters)
                {
                    command.Parameters.Add(param);
                }

                conn.Open();
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var dict = new Dictionary<string, object>();
                        for (var lp = 0; lp < reader.FieldCount; lp++)
                        {
                            dict.Add(reader.GetName(lp), reader.GetValue(lp));
                        }
                        lstResult.Add(dict);
                    }
                }
            }

            return lstResult;
        }
    }

}