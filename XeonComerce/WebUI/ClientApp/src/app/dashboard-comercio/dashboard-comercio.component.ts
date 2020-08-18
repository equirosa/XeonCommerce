import { Component, OnInit } from '@angular/core';
import { TransaccionFinanciera } from './../_models/transaccionFinanciera';
import { TransaccionFinancieraService } from './../_services/transaccionFinanciera.service';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { ComercioService } from './../_services/comercio.service';
import { FacturaMaestroService } from './../_services/facturaMaestro.service';
import { FacturaMaestro } from './../_models/facturaMaestro';
import { Comercio } from './../_models/comercio';
import { CitaService } from '../_services/cita.service';
import { CitaProducto } from '../_models/cita-producto';
import { SucursalService } from './../_services/sucursal.service';
import { Sucursal } from './../_models/sucursal';
import { Cita } from '../_models/cita';

@Component({
  selector: 'app-dashboard-comercio',
  templateUrl: './dashboard-comercio.component.html',
  styleUrls: ['./dashboard-comercio.component.css']
})
export class DashboardComercioComponent implements OnInit {

  title = 'app';
  comercio: Comercio;
  citas: CitaProducto[];
  facMaestro: FacturaMaestro[];
  traFin: TransaccionFinanciera[];
  user: User;
  sucursales: Sucursal[];
  totalCitasPendientes: number = 0;
  porcentajeCitasPendientes: number = 0;
  porcentajeCitasRealizadas: number = 0;
  porcentajeCitasCanceladas: number = 0;
  totalCitasRealizadas: number = 0;
  totalCitasCaceladas: number = 0;
  montoTotalSimpeMovil: number = 0;
  cantidadTranFinSimpeMovil: number = 0;
  montoTotalPaypal: number = 0;
  cantidadTranFinPaypal: number = 0;
  totalVentasFinalizadas: number = 0;
  montoTotalVendido: number = 0;
  totalCitasPorSucursal: number = 0;

  constructor
    (
      private transaccionFinancieraService: TransaccionFinancieraService,
      private accountService: AccountService,
      private comercioService: ComercioService,
      private facturaMaestroService: FacturaMaestroService,
      private citaService: CitaService,
      private surcursalService: SucursalService,
  )
  {
    this.getDatosVentas();
  }

  ngOnInit(): void {
    this.user = this.accountService.userValue;
    console.log(this.user.id);
  }

  getDatosCitas(comercio: Comercio): void {
    this.surcursalService.get().subscribe(sucursales => {
      this.sucursales = sucursales.filter((i) => i.idComercio == comercio.cedJuridica);
      console.log(this.sucursales);
      this.obtenerTotalCitasDeComercio(this.sucursales);
    });
  }

  obtenerTotalCitasDeComercio(sucursales : Sucursal[]): void {
    this.citaService.get().subscribe(citas => {
      for (var i = 0; i < sucursales.length; i++) {
        for (var j = 0; j < citas.length; j++) {
          if (sucursales[i].id == citas[j].idSucursal) {
            this.totalCitasPorSucursal = this.totalCitasPorSucursal + 1;
            this.obtenerEstadoCita(citas[j]);
          }
        }
      }
      this.porcentajeCitasPendientes = this.totalCitasPendientes * 10;
      this.porcentajeCitasCanceladas = this.totalCitasCaceladas * 10;
      this.porcentajeCitasRealizadas = this.totalCitasRealizadas * 10;
      console.log(this.totalCitasPorSucursal);
    });
  }

  obtenerEstadoCita(cita: Cita): void {
    if (cita.estado == "C" || cita.estado == "A") {
      this.totalCitasCaceladas = this.totalCitasCaceladas + 1;
    } else if (cita.estado == "F") {
      this.totalCitasRealizadas = this.totalCitasRealizadas + 1;
    } else if (cita.estado == "P") {
      this.totalCitasPendientes = this.totalCitasPendientes + 1;
    }
  }



  getDatosVentas(): void {
    this.comercioService.get().subscribe((comercios) => {
      let usr = comercios.find(c => c.idUsuario == this.user.id);
      this.getDatosCitas(usr);
      this.transaccionFinancieraService.get().subscribe(traFinanciera => {
        this.traFin = traFinanciera.filter((i) => i.idComercio == usr.cedJuridica);
        console.log(this.traFin);
          this.obtenerVentasTotales(this.traFin);
        });
    });
  }

  obtenerVentasTotales(traFinancieras: TransaccionFinanciera[]): void{
    for (var i = 0; i < traFinancieras.length; i++) {
      if (traFinancieras[i].estado == "F")
      {
        this.montoTotalVendido = this.montoTotalVendido + traFinancieras[i].monto;
        this.totalVentasFinalizadas = this.totalVentasFinalizadas + 1;
        this.obtenerDatosSimpeMovil(traFinancieras[i]);
        this.obtenerDatosPaypal(traFinancieras[i]);
      } 
    }
  }

  obtenerDatosSimpeMovil(traFinancieras: TransaccionFinanciera): void {
    if (traFinancieras.metodo == "SINPE") {
      this.cantidadTranFinSimpeMovil = this.cantidadTranFinSimpeMovil + 1;
      this.montoTotalSimpeMovil = this.montoTotalSimpeMovil + traFinancieras.monto;
    }
  }

  obtenerDatosPaypal(traFinancieras: TransaccionFinanciera): void {
    if (traFinancieras.metodo == "PAYPAL") {
      this.cantidadTranFinPaypal = this.cantidadTranFinPaypal + 1;
      this.montoTotalPaypal = this.montoTotalPaypal + traFinancieras.monto;
    }
  }
}
