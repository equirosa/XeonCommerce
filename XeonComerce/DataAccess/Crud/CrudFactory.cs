<<<<<<< HEAD
﻿using DataAccess.Dao;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Crud
=======
﻿using System.Collections.Generic;
using Entities;
using DataAccessLayer.Dao;

namespace DataAccessLayer.Crud
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
{
    public abstract class CrudFactory
    {
        protected SqlDao dao;

        public abstract void Create(BaseEntity entity);
<<<<<<< HEAD
        public abstract T Retrieve<T>(BaseEntity entity);
        public abstract List<T> RetrieveAll<T>();
        public abstract void Update(BaseEntity entity);
        public abstract void Delete(BaseEntity entity);

    }
=======
        public abstract T Retrieve<T>(BaseEntity entity);        
        public abstract List<T> RetrieveAll<T>();
        public abstract void Update(BaseEntity entity);
        public abstract void Delete(BaseEntity entity);
        
    }
}
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
