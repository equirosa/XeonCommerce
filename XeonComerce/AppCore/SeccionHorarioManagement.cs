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
            if (this.validaSeccionHorario(seccionHorario))
            {
                crudSeccionHorario.Create(seccionHorario);
            }
            else
            {
                throw new Exception( message: "Las horas selecionadas chocan con secciones de horario existentes");
            }

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

        public List<SeccionHorario> GetHorarioEmpleado(SeccionHorario seccionHorario)
        {
            return crudSeccionHorario.GetHorarioEmpleado<SeccionHorario>(seccionHorario);
        }


        private bool validaSeccionHorario(SeccionHorario seccionHorario)
        {
            var horario = crudSeccionHorario.GetHorarioEmpleado<SeccionHorario>(seccionHorario);

            foreach (var h in horario)
            {
                if ((seccionHorario.HoraInicio > h.HoraInicio && seccionHorario.HoraInicio < h.HoraFinal) ||
                    (seccionHorario.HoraFinal > h.HoraInicio &&
                     seccionHorario.HoraFinal < h.HoraFinal))
                {
                    return false;
                }
            }

            return true;
        }
    }

}