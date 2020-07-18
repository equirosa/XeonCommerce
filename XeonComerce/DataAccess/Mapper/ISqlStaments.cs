using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    public interface ISqlStaments
    {
        SqlOperation GetCreateStatement(BaseEntity entity);
        SqlOperation GetRetriveStatement(BaseEntity entity);
        SqlOperation GetRetriveAllStatement();
        SqlOperation GetUpdateStatement(BaseEntity entity);
        SqlOperation GetDeleteStatement(BaseEntity entity);
    }
}
