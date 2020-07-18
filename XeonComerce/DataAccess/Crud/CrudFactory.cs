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
>>>>>>> f1f7444706474011f9237ab354395ed043deeeae
{
    public abstract class CrudFactory
    {
        protected SqlDao dao;

        public abstract void Create(BaseEntity entity);
        public abstract T Retrieve<T>(BaseEntity entity);
        public abstract List<T> RetrieveAll<T>();
        public abstract void Update(BaseEntity entity);
        public abstract void Delete(BaseEntity entity);

    }
<<<<<<< HEAD
=======
}
>>>>>>> f1f7444706474011f9237ab354395ed043deeeae
