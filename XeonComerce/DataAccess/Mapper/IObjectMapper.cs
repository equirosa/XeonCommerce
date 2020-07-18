<<<<<<< HEAD
﻿using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
{
    interface IObjectMapper
    {
        List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows);
        BaseEntity BuildObject(Dictionary<string, object> row);
    }
}
=======
﻿
using Entities;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper
{
    interface IObjectMapper
    {
        List<BaseEntity> BuildObjects(List<Dictionary<string,object>> lstRows);
        BaseEntity BuildObject(Dictionary<string, object> row);
    }
}
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
