import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';
import { Usuario } from '../_models/usuario';
import { TransaccionFinanciera } from './../_models/transaccionFinanciera';
import { TransaccionFinancieraService } from './../_services/transaccionFinanciera.service';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { ComercioService } from './../_services/comercio.service';
import { FacturaMaestroService } from './../_services/facturaMaestro.service';
import { FacturaMaestro } from './../_models/facturaMaestro';
import { Comercio } from './../_models/comercio';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  title = 'app';
  widthPorcentajeCitasRealizadas: number = 5;
  usuarios: Usuario[];
  usuariosCount: number;
  montoTotalSimpeMovil: number = 0;
  cantidadTranFinSimpeMovil: number = 0;
  montoTotalPaypal: number = 0;
  cantidadTranFinPaypal: number = 0;
  montoTotalVendido: number = 0;

  constructor
    (private usuarioService: UsuarioService,
      private transaccionFinancieraService: TransaccionFinancieraService,
      private accountService: AccountService,
      private comercioService: ComercioService,
      private facturaMaestroService: FacturaMaestroService
    ) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.obtenerVentasTotales();
  }

  getUsuarios(): void {
    this.usuarioService.get().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.usuariosCount = this.usuarios.length;
    });
  }

  obtenerVentasTotales(): void {
    this.transaccionFinancieraService.get().subscribe(traFinanciera => {
      for (var i = 0; i < traFinanciera.length; i++) {
        if (traFinanciera[i].estado == "F") {
          this.montoTotalVendido = this.montoTotalVendido + traFinanciera[i].monto;
          this.obtenerDatosSimpeMovil(traFinanciera[i]);
          this.obtenerDatosPaypal(traFinanciera[i]);
        }
      }
    });
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
