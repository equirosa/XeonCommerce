using System;
using System.Collections.Generic;
<<<<<<< HEAD
using System.Text;

namespace DataAccess.Mapper
{
    public abstract class EntityMapper
    {
=======

namespace DataAccessLayer.Mapper
{
    public abstract class EntityMapper
    {      
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
        protected string GetStringValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is string)
<<<<<<< HEAD
                return (string)val;
=======
                return (string) val;
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5

            return "";
        }

        protected int GetIntValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && (val is int || val is decimal))
<<<<<<< HEAD
                return (int)dic[attName];
=======
                return (int) dic[attName];
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5

            return -1;
        }

<<<<<<< HEAD
        protected decimal GetDecimalValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is decimal)
                return (decimal)dic[attName];
=======
        protected double GetDoubleValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is double)
                return (double)dic[attName];
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5

            return -1;
        }

        protected DateTime GetDateValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is DateTime)
                return (DateTime)dic[attName];

            return DateTime.Now;
        }

<<<<<<< HEAD
        protected double GetDoubleValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is double)
                return (double)dic[attName];

            return -1;
        }


    }
}
=======

    }
}
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
