using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class CitaManagement
    {

        private CitaCrudFactory crud;

        public CitaManagement()
        {
            crud = new CitaCrudFactory();
        }

        public Cita RetriveById(Cita cita)
        {
            return crud.Retrieve<Cita>(cita);
        }
    }
}
