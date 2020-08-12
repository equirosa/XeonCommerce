import { FacturaDetalle } from './../_models/facturaDetalle';
import { TransaccionFinancieraService } from './../_services/transaccionFinanciera.service';
import { FacturaMaestroService } from './../_services/facturaMaestro.service';
import { FacturaMaestro } from './../_models/facturaMaestro';
import { FacturaDetalleService } from './../_services/facturaDetalle.service';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { Comercio } from '../_models/comercio';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ComercioService } from '../_services/comercio.service';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DireccionService } from '../_services/direccion.service';
import { DialogDireccion } from '../comercios/comercios.component';
import {PageEvent} from '@angular/material/paginator';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
	selector: 'app-historial-compras',
	templateUrl: './historial-compras.component.html',
	styleUrls: ['./historial-compras.component.css']
  })
  export class HistorialComprasComponent implements OnInit {

	historial: any[] = [];
	user: User;

	constructor(public dialog: MatDialog, private comercioService: ComercioService, private facturaDetalleService: FacturaDetalleService,
		 private facturaMaestroService: FacturaMaestroService, private transaccionFinancieraService: TransaccionFinancieraService, private direccionService: DireccionService,
		  private mensajeService: MensajeService, private ubicacionService: UbicacionService, private accountService: AccountService) {
			this.accountService.user.subscribe(x => {
				this.user = x;
			});
		  }
  

	
	ngOnInit() {
	  this.getCompras();
	}
	
	  getCompras(): void {
		this.facturaMaestroService.get()
		.subscribe(facturas => {
			let facMaestro: any[];
			facMaestro = facturas.sort((a, b) => {
				return a.fecha.getTime() - b.fecha.getTime();
			  });
			  facMaestro = facMaestro.filter(i=> i.idCliente == this.user.id);
			  
			  
			  facMaestro.forEach((i, index)=>{
				  let subir = i;
				this.facturaDetalleService.getBy(i.idFactura).subscribe((detalles)=>{
					subir["detalles"] =  detalles;
					this.transaccionFinancieraService.getBy(i.idTransaccion).subscribe((transaccionFinanciera)=>{
						subir["transaccionFinanciera"] = transaccionFinanciera;
						this.historial.push(subir);
						console.log(subir);
					});
				});

			  });

		});
	}

	
}