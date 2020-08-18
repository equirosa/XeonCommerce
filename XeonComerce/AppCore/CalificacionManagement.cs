#region libraries
using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Crud;
using Entities;
#endregion

namespace AppCore
{
    public class CalificacionManagement
    {
        #region properties
        private CalificacionCrudFactory crud;
        #endregion

        #region constructor
        public CalificacionManagement()
        {
            this.crud = new CalificacionCrudFactory();
        }
        #endregion

        #region methods
        public void Create(Calificaciones calificacion)
        {

            crud.Create(calificacion);

        }

        public List<Calificaciones> RetrieveAll()
        {
            return crud.RetrieveAll<Calificaciones>();
        }

        public Calificaciones RetrieveById(Calificaciones calificaciones)
        {
            return crud.Retrieve<Calificaciones>(calificaciones);
        }

        public void Update(Calificaciones calificaciones)
        {
            crud.Update(calificaciones);
        }

        public void Delete(Calificaciones calificaciones)
        {
            crud.Delete(calificaciones);
        }
        #endregion
    }
}
