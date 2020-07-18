using System;
using System.Collections.Generic;
<<<<<<< HEAD
using System.Text;
=======
using System.Linq;
using System.Text;
using System.Threading.Tasks;
>>>>>>> f1f7444706474011f9237ab354395ed043deeeae

namespace Entities
{
    public class BaseEntity
    {
<<<<<<< HEAD
=======

>>>>>>> f1f7444706474011f9237ab354395ed043deeeae
        public String GetEntityInformation()
        {
            var dump = ObjectDumper.Dump(this);
            return dump;
        }
    }
}
