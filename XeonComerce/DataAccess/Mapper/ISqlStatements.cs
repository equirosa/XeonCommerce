

using DataAccessLayer.Dao;
using Entities;

namespace DataAccessLayer.Mapper
{
    public interface ISqlStatements
    {
        SqlOperation GetCreateStatement(BaseEntity entity);
        SqlOperation GetRetriveStatement(BaseEntity entity);
        SqlOperation GetRetriveAllStatement();
        SqlOperation GetUpdateStatement(BaseEntity entity);
        SqlOperation GetDeleteStatement(BaseEntity entity);
    }
}