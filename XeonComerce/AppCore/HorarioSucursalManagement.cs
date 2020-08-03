using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class HorarioSucursalManagement
    {
        private HorarioSucursalCrudFactory crudHorarioSucursal; 

        public HorarioSucursalManagement()
        {
            crudHorarioSucursal = new HorarioSucursalCrudFactory();
        }

        public void Create(HorarioSucursal horarioSucursal)
        {
            crudHorarioSucursal.Create(horarioSucursal);
        }

        public List<HorarioSucursal> RetrieveAll()
        {
            return crudHorarioSucursal.RetrieveAll<HorarioSucursal>();
        }

        public HorarioSucursal RetrieveById(HorarioSucursal horarioSucursal)
        {
            return crudHorarioSucursal.Retrieve<HorarioSucursal>(horarioSucursal);
        }

        public void Update(HorarioSucursal horarioSucursal)
        {
            crudHorarioSucursal.Update(horarioSucursal);
        }

        public void Delete(HorarioSucursal horarioSucursal)
        {
            crudHorarioSucursal.Delete(horarioSucursal);
        }
    }
}
