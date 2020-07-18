using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class VistaManagement
    {
        private VistaCrudFactory crud;

        public VistaManagement()
        {
            crud = new VistaCrudFactory();
        }

        public List<Vista> RetriveAll()
        {
            return crud.RetrieveAll<Vista>();
        }

        public Vista RetriveById(Vista obj)
        {
            return crud.Retrieve<Vista>(obj);
        }
    }
}
