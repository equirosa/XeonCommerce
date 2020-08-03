using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class ArchivoManagement
    {
        private ArchivoCrudFactory crud;

        public ArchivoManagement()
        {
            crud = new ArchivoCrudFactory();
        }

        public void Create(Archivo obj)
        {
            crud.Create(obj);
        }

        public List<Archivo> RetriveAll()
        {
            return crud.RetrieveAll<Archivo>();
        }

        public Archivo RetriveById(Archivo obj)
        {
            return crud.Retrieve<Archivo>(obj);
        }

        public void Update(Archivo obj)
        {
            crud.Update(obj);
        }

        public void Delete(Archivo obj)
        {
            crud.Delete(obj);
        }
    }
}
