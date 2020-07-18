using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
<<<<<<< HEAD
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

            CONNECTION_STRING=ConfigurationManager.ConnectionStrings["CONN_STRING"].ConnectionString;

            //CONNECTION_STRING = @"Data Source=.\SQLExpress;Initial Catalog=PROY_2;Integrated Security=True";


        }


=======
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Dao
{
    public class SqlDao
    {   
                     
       private string CONNECTION_STRING = "";
       
       private static SqlDao instance;

        private SqlDao()
        {
            /*
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            CONNECTION_STRING = builder.Build().GetSection("ConnectionStrings").GetSection("CONN_STRING").Value;*/
            CONNECTION_STRING = @"Data Source=.;Initial Catalog=Laboratorio2;Integrated Security=True";
        }

        //IMPLEMENTA EL PATRON LLAMADO SINGLETON
        //INVESTIGAR EL PATRON
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
        public static SqlDao GetInstance()
        {
            if (instance == null)
                instance = new SqlDao();

            return instance;
        }

<<<<<<< HEAD
        public void ExecuteProcedure(SqlOperation sqlOperation)
        {
=======
       public void ExecuteProcedure(SqlOperation sqlOperation)
       {
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
            using (var conn = new SqlConnection(CONNECTION_STRING))
            using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            })
<<<<<<< HEAD
            {
=======
            {                          
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
                foreach (var param in sqlOperation.Parameters)
                {
                    command.Parameters.Add(param);
                }

                conn.Open();
                command.ExecuteNonQuery();
            }
<<<<<<< HEAD
        }

        public List<Dictionary<string, object>> ExecuteQueryProcedure(SqlOperation sqlOperation)
        {
            var lstResult = new List<Dictionary<string, object>>();
=======
       }

       public List<Dictionary<string, object>> ExecuteQueryProcedure(SqlOperation sqlOperation)
        {
            var lstResult=new List<Dictionary<string,object>>();
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5

            using (var conn = new SqlConnection(CONNECTION_STRING))
            using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            })
<<<<<<< HEAD
            {
=======
            { 
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
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
<<<<<<< HEAD
        }
=======
        }      
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
    }
}
