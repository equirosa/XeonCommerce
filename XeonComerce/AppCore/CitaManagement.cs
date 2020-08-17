using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace AppCore
{
    public class CitaManagement
    {

        private CitaCrudFactory crudCita;
        private ProductoCitaCrudFactory crudProductoCita;
        private DiaFeriadoCrudFactory crudDiaFeriado; 
        private HorarioSucursalCrudFactory crudHorarioSucursal;
        private SeccionHorarioCrudFactory crudSeccionHorario;
        private EmpleadoComercioSucursalCrudFactory crudEmpleado;
        private TranFinCrudFactory crudTransaccion;
        private FacturaMasterCrudFactory crudFacturaMaestro;
        private FacturaDetalleCrudFactory crudFacturaDetalle;
        private ProductoServicioCrudFactory crudProducto;


        public CitaManagement()
        {
            crudCita = new CitaCrudFactory();
            crudProductoCita = new ProductoCitaCrudFactory();
            crudHorarioSucursal = new HorarioSucursalCrudFactory();
            crudSeccionHorario = new SeccionHorarioCrudFactory();
            crudEmpleado = new EmpleadoComercioSucursalCrudFactory();
            crudTransaccion = new TranFinCrudFactory();
            crudFacturaMaestro = new FacturaMasterCrudFactory();
            crudDiaFeriado = new DiaFeriadoCrudFactory();
            crudFacturaDetalle = new FacturaDetalleCrudFactory();
            crudProducto = new ProductoServicioCrudFactory();

        }

        public void Create(CitaProducto citaProducto)
        {
            // Validar disponibilidad de horario de la sucursal ( tambien se puede agregar esta validacion en el frontend) **
            // Validar Disponibilidad de empleados  (Debe de coincidir con su horario y no puede tener otra cita asignada para esa fecha y hora) **
            // Validar que la fecha no sea un dia feriado **
            // Validar disponibilidad de empleado **
            // Asignar empleado a la cita **
            // Crear Transaccion **
            // Crear Factura maestro **
            // Crear Cita **

            // Crear Facturas detalle para cada producto**

            // Restar la cantidad reservada de los productos del stock!!!

            
            

            // Si la cita es tipo producto 

            var cita = this.CrearCita(citaProducto);
            
            var validHorarioSucursal = this.ValidarHorarioSucursal(cita);

            var empleado = this.AsignarEmpleado(cita);

            if (!validHorarioSucursal) throw new Exception("La sucursal se encuentra cerrada en las horas seleccionadas");
            if (empleado == null) throw new Exception("No hay personal disponible para atender la cita");
            if (!this.ValidarDiaFeriado(cita)) throw new Exception("La fecha seleccionada es un dia feriado");
           
            var transaccion = this.CrearTransaccion(cita);
            var factura = this.crearFacturaMaestro(cita, transaccion.Id);
            cita.IdFactura = factura.IdFactura;
            cita.IdEmpleadoComercioSucursal = empleado.IdEmpleado;
            crudCita.Create(cita);
            var citaCreada = crudCita.RetrieveUltimo<Cita>();
            this.CrearFacturasDetalle(citaCreada, citaProducto.Productos);

            this.EliminarStock(citaProducto.Productos);
        }

        public Cita RetriveById(Cita cita)
        {
            return crudCita.Retrieve<Cita>(cita);
        }


        private TranFin CrearTransaccion(Cita cita)
        {
            var t = new TranFin()
            {
                Id = 0,
                Monto = 0,
                Metodo = "",
                IdCliente = cita.IdCliente,
                IdComercio = cita.IdComercio,
                Fecha = cita.HoraFinal,
                Estado = "P"
            };

            crudTransaccion.Create(t);
            var transaccion = crudTransaccion.RetrieveUltimo<TranFin>();

            return transaccion;
        }

        private FacturaMaestro crearFacturaMaestro(Cita cita, int idTransaccion)
        {
            var fm = new FacturaMaestro()
            {
                IdFactura = 0,
                IdTransaccion = idTransaccion,
                Fecha = cita.HoraFinal,
                CedulaJuridica = cita.IdComercio,
                IdCliente = cita.IdCliente
            };

            crudFacturaMaestro.Create(fm);
            var facturaMaestro = crudFacturaMaestro.RetrieveUltimo<FacturaMaestro>();

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

        private void CrearFacturasDetalle(Cita cita, Producto[] productos)
        {
            foreach(var p in productos)
            {
                this.CrearFD(cita.IdFactura, p);
                //var facturaDetalle = new FacturaDetalle()
                //{
                //    IdLinea = 0,
                //    IdProducto = p.Id,
                //    Valor = p.Precio,
                //    Descuento = p.Descuento,
                //    Cantidad = p.Cantidad,
                //    IVA = p.Impuesto,
                //    IdFactura = cita.IdFactura,
                //    TotalLinea = (p.Precio * p.Cantidad) - (p.Descuento * p.Cantidad)
                //};

                //crudFacturaDetalle.Create(facturaDetalle);
            }
        }

        private void CrearFD(int idFactura, Producto producto)
        {
            var facturaDetalle = new FacturaDetalle()
            {
                IdLinea = 0,
                IdProducto = producto.Id,
                Valor = producto.Precio,
                Descuento = producto.Descuento,
                Cantidad = producto.Cantidad,
                IVA = producto.Impuesto,
                IdFactura = idFactura,
                TotalLinea = (producto.Precio * producto.Cantidad) - (producto.Descuento * producto.Cantidad)
            };

            crudFacturaDetalle.Create(facturaDetalle);
        }

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
                        (h.HoraFinal.Hour > cita.HoraFinal.Hour || (h.HoraFinal.Hour == cita.HoraFinal.Hour && h.HoraFinal.Minute >= cita.HoraFinal.Minute) ) &&
                        this.ValidarDisponibilidadEmpleado(cita, e.IdEmpleado)
                        )
                    {
                        return e;
                    }
                }
            }
            
            return null;
        }

        private bool ValidarDisponibilidadEmpleado(Cita cita, int idEmpleado)
        {
            // Agregar que solo se validen las citas con un estado permitido !!
           
            var citas = crudCita.RetrieveAll<Cita>();

            foreach (var c in citas)
            {
                if (c.IdEmpleadoComercioSucursal == idEmpleado && c.Estado == "P" &&
                    cita.HoraInicio.Year == c.HoraInicio.Year && cita.HoraInicio.Month == c.HoraInicio.Month &&
                    cita.HoraInicio.Day == c.HoraInicio.Day &&
                    ((cita.HoraInicio > c.HoraInicio && cita.HoraInicio < c.HoraFinal) || (cita.HoraFinal > c.HoraInicio && cita.HoraFinal < c.HoraFinal))
                    )
                {
                    return false;
                }
            }

            return true;
        }

        private bool ValidarDiaFeriado(Cita cita)
        {
            var diasFeridados = crudDiaFeriado.RetrieveAll<DiaFeriado>();
            foreach(var d in diasFeridados)
            {
                if(cita.HoraInicio.Year == d.Fecha.Year && cita.HoraInicio.Month == d.Fecha.Month && cita.HoraInicio.Day == d.Fecha.Day)
                {
                    return false;
                }
            }
            return true;
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



        public List<CitaProducto> RetrieveAll()
        {
            var citasProducto = new List<CitaProducto>();
            var citas = crudCita.RetrieveAll<Cita>();

            foreach (var c in citas)
            {
                citasProducto.Add(this.CrearCitaProducto(c));
            }

            return citasProducto;
        }

        private CitaProducto CrearCitaProducto(Cita cita)
        {
            var citaProducto = new CitaProducto();
            citaProducto.Id = cita.Id;
            citaProducto.HoraInicio = cita.HoraInicio;
            citaProducto.HoraFinal = cita.HoraFinal;
            citaProducto.Estado = cita.Estado;
            citaProducto.Tipo = cita.Tipo;
            citaProducto.IdCliente = cita.IdCliente;
            citaProducto.IdEmpleado = cita.IdEmpleadoComercioSucursal;
            citaProducto.IdFactura = cita.IdFactura;
            citaProducto.IdCliente = cita.IdCliente;
            citaProducto.IdSucursal = cita.IdSucursal;
            citaProducto.IdComercio = cita.IdComercio;
            citaProducto.Productos = crudProducto.RetrieveProductosCita<Producto>(cita).ToArray();

            return citaProducto;

        }


        public void CancelarCita(CitaProducto citaProducto)
        {
            // Actualizar transaccion a cancelada 

            var facturaM = crudFacturaMaestro.Retrieve<FacturaMaestro>(new FacturaMaestro() { IdFactura = citaProducto.IdFactura });

            var transaccion = crudTransaccion.Retrieve<TranFin>(new TranFin() { Id = facturaM.IdTransaccion });
            transaccion.Estado = "C";
            crudTransaccion.Update(transaccion);

            var cita = this.CrearCita(citaProducto);
            cita.Estado = "C";
            crudCita.Update(cita);

            var facturasDetalle = crudFacturaDetalle.RetrieveDetalleCita<FacturaDetalle>(facturaM);
            this.RegresarStock(facturasDetalle);
            

        }

        private void RegresarStock(List<FacturaDetalle> facturasDetalle)
        {
            foreach(var fd in facturasDetalle)
            {
                this.Rstock(fd.IdProducto, fd.Cantidad);
                //var producto = crudProducto.RetrieveProducto<Producto>(new Producto() { Id = fd.IdProducto });
                //producto.Cantidad += fd.Cantidad;
                //crudProducto.Update(producto);
            }
        }

        private void EliminarStock(Producto[] productos)
        {
             foreach(var p in productos)
            {
                this.Estock(p.Id, p.Cantidad);
                //var producto = crudProducto.RetrieveProducto<Producto>(new Producto() { Id = p.Id });
                //producto.Cantidad -= p.Cantidad;
                //crudProducto.Update(producto);
            }

        }

        private void Estock(int idProducto, int cantidad)
        {
            var producto = crudProducto.RetrieveProducto<Producto>(new Producto() { Id = idProducto });
            producto.Cantidad -= cantidad;
            crudProducto.Update(producto);
        }

        private void Rstock(int idProducto, int cantidad)
        {
            var producto = crudProducto.RetrieveProducto<Producto>(new Producto() { Id = idProducto });
            producto.Cantidad += cantidad;
            crudProducto.Update(producto);
        }

        public void FinalizarCita(CitaProducto citaProducto)
        {
            var facturaM = crudFacturaMaestro.Retrieve<FacturaMaestro>(new FacturaMaestro() { IdFactura = citaProducto.IdFactura });
            var transaccion = crudTransaccion.Retrieve<TranFin>(new TranFin() { Id = facturaM.IdTransaccion });
            var facturasDetalle = crudFacturaDetalle.RetrieveDetalleCita<FacturaDetalle>(facturaM);
            var cita = crudCita.Retrieve<Cita>(new Cita() { Id = citaProducto.Id });

            if ( citaProducto.Estado == "A")
            {
                // Estado Ausente:
                // - Regresar el stock 
                // - Actualizar cantidad a la factura detalle
                // - Actualizar estado de la cita 
                // - Actualizar estado de la transaccion

                transaccion.Estado = "C";
                crudTransaccion.Update(transaccion);

                //var cita = this.CrearCita(citaProducto);
                
                cita.Estado = "A";
                crudCita.Update(cita);

                
                this.RegresarStock(facturasDetalle);

            }else if( citaProducto.Estado == "F")
            {
                // Estado Finalizado

                foreach ( var p in citaProducto.Productos)
                {
                    foreach(var f in facturasDetalle)
                    {
                        if( p.Id == f.IdProducto)
                        {
                            var diferencia = p.Cantidad - f.Cantidad;

                            if (diferencia > 0 && p.Cantidad != 0)
                            {
                                // Se compro mas cantidad del producto de la que se reservo 
                                this.Estock(p.Id, diferencia);
                                f.Cantidad = p.Cantidad;
                                f.TotalLinea = (p.Precio * p.Cantidad) - (p.Descuento * p.Cantidad);
                                crudFacturaDetalle.Update(f);

                            } else if(diferencia < 0 && p.Cantidad != 0 )
                            {
                                // Se compro menos cantidad del producto de la que se reservo
                                this.Rstock(p.Id, -1*diferencia);
                                f.Cantidad = p.Cantidad;
                                f.TotalLinea = (p.Precio * p.Cantidad) - (p.Descuento * p.Cantidad);
                                crudFacturaDetalle.Update(f);
                            }

                            if(p.Cantidad == 0)
                            {
                                // No se compro el produto reservado
                                this.Rstock(f.IdProducto, f.Cantidad);
                                f.TotalLinea = 0;
                                crudFacturaDetalle.Update(f);
                                /*transaccion.Estado = "P"*/;
                                //crudFacturaDetalle.Delete(f);
                            }

                        }else
                        {
                            //Se compro un nuevo tipo de producto, que no estaba apartado
                            this.CrearFD(citaProducto.IdFactura, p);
                            this.Estock(p.Id, p.Cantidad);
                        }
                    }
                }

                // Se actualiza la cita                 
                cita.Estado = "F";
                crudCita.Update(cita);


                // Actualizar el monto de la transaccion 
                transaccion.Monto = this.calcularMontoTransaccion(facturaM);
                crudTransaccion.Update(transaccion);
            }

            
        }

        private double calcularMontoTransaccion(FacturaMaestro facturaM)
        {
            var facturasDetalle = crudFacturaDetalle.RetrieveDetalleCita<FacturaDetalle>(facturaM);

            double monto = 0; 

            foreach(var f in facturasDetalle)
            {
                monto += f.TotalLinea; 
            }

            return monto; 
        }






    }
        
}
