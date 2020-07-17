using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class BaseEntity
    {
        public String GetEntityInformation()
        {
            var dump = ObjectDumper.Dump(this);
            return dump;
        }
    }
}
