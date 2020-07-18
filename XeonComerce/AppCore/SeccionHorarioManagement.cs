using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class SeccionHorarioManagement
    {

        private SeccionHorarioCrudFactory crudSeccionHorario;

        public SeccionHorarioManagement()
        {
            crudSeccionHorario = new SeccionHorarioCrudFactory();
        }

        public void Create(SeccionHorario seccionHorario)
        {
            crudSeccionHorario.Create(seccionHorario);
        }

        public List<SeccionHorario> RetrieveAll()
        {
            return crudSeccionHorario.RetrieveAll<SeccionHorario>();
        }

        public SeccionHorario RetrieveById(SeccionHorario seccionHorario)
        {
            return crudSeccionHorario.Retrieve<SeccionHorario>(seccionHorario);
        }

        public void Update(SeccionHorario seccionHorario)
        {
            crudSeccionHorario.Update(seccionHorario);
        }

        public void Delete(SeccionHorario seccionHorario)
        {
            crudSeccionHorario.Delete(seccionHorario);
        }
    }
}
