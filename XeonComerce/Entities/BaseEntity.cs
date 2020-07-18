using System;
using System.Collections.Generic;
<<<<<<< HEAD
using System.Text;
=======
using System.Linq;
using System.Text;
using System.Threading.Tasks;
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5

namespace Entities
{
    public class BaseEntity
    {
<<<<<<< HEAD
=======
       
>>>>>>> af0355fbb98de53c4c4401f31c0b68a52e5937e5
        public String GetEntityInformation()
        {
            var dump = ObjectDumper.Dump(this);
            return dump;
        }
    }
}
