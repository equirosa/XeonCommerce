using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class HorarioEmpleadoManagement
    {

        private HorarioEmpleadoCrudFactory crudHorarioEmpleado;

        public HorarioEmpleadoManagement()
        {
            crudHorarioEmpleado = new HorarioEmpleadoCrudFactory();
        }

        public void Create(HorarioEmpleado horarioEmpleado)
        {
            crudHorarioEmpleado.Create(horarioEmpleado);
        }

        public List<HorarioEmpleado> RetrieveAll()
        {
            return crudHorarioEmpleado.RetrieveAll<HorarioEmpleado>();
        }

        public HorarioEmpleado RetrieveById(HorarioEmpleado horarioEmpleado)
        {
            return crudHorarioEmpleado.Retrieve<HorarioEmpleado>(horarioEmpleado);
        }

        public void Update(HorarioEmpleado horarioEmpleado)
        {
            crudHorarioEmpleado.Update(horarioEmpleado);
        }

        public void Delete(HorarioEmpleado horarioEmpleado)
        {
            crudHorarioEmpleado.Delete(horarioEmpleado);
        }
    }
}
