﻿using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppCore
{
    public class CitaManagement
    {

        private CitaCrudFactory crudCita;
        private ProductoCitaCrudFactory crudProductoCita;
        
        private HorarioSucursalCrudFactory crudHorarioSucursal;
        private SeccionHorarioCrudFactory crudSeccionHorario;
        private EmpleadoComercioSucursalCrudFactory crudEmpleado;
        private TranFinCrudFactory crudTransaccion; 

        public CitaManagement()
        {
            crudCita = new CitaCrudFactory();
            crudProductoCita = new ProductoCitaCrudFactory();
            crudHorarioSucursal = new HorarioSucursalCrudFactory();
            crudSeccionHorario = new SeccionHorarioCrudFactory();
            crudEmpleado = new EmpleadoComercioSucursalCrudFactory();
            crudTransaccion = new TranFinCrudFactory();
        }

        public void Create(CitaProducto citaProducto)
        {
            // Validar disponibilidad de horario de la sucursal ( tambien se puede agregar esta validacion en el frontend)
            // Validar Disponibilidad de empleados  (Debe de coincidir con su horario y no puede tener otra cita asignada para esa fecha y hora) 
            // Validar que la fecha no sea un dia feriado
            // Validar disponibilidad de empleado 
            // Asignar empleado a la cita 
            // Crear Transaccion 
            // Crear Factura maestro 
            // Crear Cita 
            // Crear Facturas detalle para cada producto

            

            // Si la cita es tipo producto 

            var cita = this.CrearCita(citaProducto);
            
            var validHorarioSucursal = this.ValidarHorarioSucursal(cita);

            var empleado = this.AsignarEmpleado(cita);

            if( validHorarioSucursal && empleado != null)
            {
                var transaccion = this.CrearTransaccion(cita);
                var factura = this.crearFacturaMaestro(cita, transaccion.Id);
                cita.IdFactura = factura.IdFactura;


            }


        }

        public Cita RetriveById(Cita cita)
        {
            return crudCita.Retrieve<Cita>(cita);
        }

        public List<Cita> RetrieveAll()
        {
            return crudCita.RetrieveAll<Cita>();
        }

        private TranFin CrearTransaccion(Cita cita)
        {
            var transaccion = new TranFin()
            {
                Id = 0,
                Monto = 0,
                Metodo = "",
                IdCliente = cita.IdCliente,
                IdComercio = cita.IdComercio,
                Fecha = cita.HoraFinal,
                Estado = "P"
            };

            crudTransaccion.Create(transaccion);

            return transaccion;
        }

        private FacturaMaestro crearFacturaMaestro(Cita cita, int idTransaccion)
        {
            var facturaMaestro = new FacturaMaestro()
            {
                IdFactura = 0,
                IdTransaccion = idTransaccion,
                Fecha = cita.HoraFinal,
                CedulaJuridica = cita.IdComercio,
                IdCliente = cita.IdCliente
            };

            return facturaMaestro;

        }

        private Cita CrearCita(CitaProducto citaProducto)
        {
            var cita = new Cita()
            {
                Id = citaProducto.Id,
                HoraInicio = citaProducto.HoraInicio,
                HoraFinal = citaProducto.HoraFinal,
                Estado = citaProducto.Estado,
                Tipo = citaProducto.Tipo,
                IdCliente = citaProducto.IdCliente,
                IdEmpleadoComercioSucursal = citaProducto.IdEmpleado,
                IdFactura = citaProducto.IdFactura,
                IdSucursal = citaProducto.IdSucursal,
                IdComercio = citaProducto.IdComercio
            };
            return cita;          
        }

        //private void CrearProductosCita(Cita cita, Producto[] productos)
        //{
        //    foreach(var p in productos)
        //    {
        //        var productoCita = new ProductoCita()
        //        {
        //            IdCita = cita.Id,
        //            IdProducto = p.Id,
        //            Cantidad = p.Cantidad
        //        };

        //        crudProductoCita.Create(productoCita);
        //    }
        //}

        private bool ValidarHorarioSucursal(Cita cita)
        {
            var horarioSucursal = this.CrearHorarioSucursal(cita.IdSucursal);
            var dia = (int)cita.HoraInicio.DayOfWeek + 1;
            
            foreach( var h in horarioSucursal)
            {
                if( h.DiaSemana == dia &&
                    (h.HoraInicio.Hour < cita.HoraInicio.Hour || (h.HoraInicio.Hour == cita.HoraInicio.Hour && h.HoraInicio.Minute <= cita.HoraInicio.Minute)) &&
                    (h.HoraFinal.Hour > cita.HoraFinal.Hour || (h.HoraFinal.Hour == cita.HoraFinal.Hour && h.HoraFinal.Minute >= cita.HoraFinal.Minute))
                    )
                {
                    return true;            
                }
            }
            return false; 
        }

        private Empleado AsignarEmpleado(Cita cita)
        {
            var empleados = crudEmpleado.GetEmpleadosByIdSucursal<Empleado>(cita.IdSucursal);

            foreach (var e in empleados)
            {
                SeccionHorario sc = new SeccionHorario() { IdEmpleado = e.IdEmpleado, DiaSemana = (int)cita.HoraInicio.DayOfWeek + 1 };
                var horarioEmpleado = crudSeccionHorario.GetHorarioEmpleado<SeccionHorario>(sc);

                foreach (var h in horarioEmpleado)
                {
                    if (
                        h.Estado == "A" &&
                        (h.HoraInicio.Hour < cita.HoraInicio.Hour || ( h.HoraInicio.Hour == cita.HoraInicio.Hour && h.HoraInicio.Minute <= cita.HoraInicio.Minute) ) &&
                        (h.HoraFinal.Hour > cita.HoraFinal.Hour || (h.HoraFinal.Hour == cita.HoraFinal.Hour && h.HoraFinal.Minute >= cita.HoraFinal.Minute) )
                        )
                    {
                        return e;
                    }
                }
            }
            
            return null;
        }

        private List<HorarioSucursal> CrearHorarioSucursal(string idSucursal)
        {
            var horarioSucursal = new List<HorarioSucursal>();
            var horarios = crudHorarioSucursal.RetrieveAll<HorarioSucursal>();

            foreach (var h in horarios)
            {
                if (h.IdSucursal == idSucursal)
                {
                    horarioSucursal.Add(h);
                }
            }

            return horarioSucursal;
        }
    }
}
