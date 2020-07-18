<<<<<<< HEAD
﻿using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Mapper
=======
﻿
using Entities;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper
>>>>>>> f1f7444706474011f9237ab354395ed043deeeae
{
    interface IObjectMapper
    {
        List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows);
        BaseEntity BuildObject(Dictionary<string, object> row);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> f1f7444706474011f9237ab354395ed043deeeae
