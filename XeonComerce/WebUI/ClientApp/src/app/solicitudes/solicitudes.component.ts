import { DialogArchivo } from './../comercios/comercios.component';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs/operators';
import { Direccion } from './../_models/direccion';
import { Ubicacion } from './../_models/ubicacion';
import { Comercio } from '../_models/comercio';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ComercioService } from '../_services/comercio.service';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DireccionService } from '../_services/direccion.service';
import { DialogDireccion } from '../comercios/comercios.component';

@Component({
	selector: 'app-solicitudes',
	templateUrl: './solicitudes.component.html',
	styleUrls: ['./solicitudes.component.css']
  })
  export class SolicitudesComponent implements OnInit {

	comercios: Comercio[];
	displayedColumns: string[] = ['cedJuridica', 'nombreComercial', 'correoElectronico', 'telefono', 'documentos', 'direccion', 'idUsuario', 'estado','aceptar', 'rechazar'];
	datos;
	mostrar: boolean;
	
	constructor(public dialog: MatDialog, private comercioService: ComercioService, private direccionService: DireccionService, private mensajeService: MensajeService, private ubicacionService: UbicacionService) { }
  

	@ViewChild(MatSort, {static: true}) sort: MatSort;

	
	  ngOnInit() {
		  this.mostrar = false;
	  this.getComercios();
	}
	
	verDocumentos(comercio: Comercio): void {
		const dialogRef = this.dialog.open(DialogArchivo, {
			maxWidth: "500px",
			data: { cedJuridica: comercio.cedJuridica }
		  });
}

	filtrar(event: Event) {
		const filtro = (event.target as HTMLInputElement).value;
		this.datos.filter = filtro.trim().toLowerCase();
	  }
	
	  getComercios(): void {
		this.comercioService.get()
		.subscribe(comercios => {
			this.comercios = comercios.sort((a, b) => {
				return a.nombreComercial.localeCompare(b.nombreComercial);
			  });
			  console.log(this.comercios)
			  if(!this.mostrar) this.comercios = comercios.filter((a)=> a.estado == 'P' || a.estado == "");
			this.datos = new MatTableDataSource(this.comercios);
			this.datos.sort = this.sort;
		});
	}
  
	mostrarT(): void {
		this.mostrar = !this.mostrar;
		this.getComercios();
	}
  
	aceptar(comercio: Comercio): void {

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: "500px",
			data: {
				title: "¿Está seguro?",
				message: "Usted está apunto de aceptar un comercio. "}
		  });
		  dialogRef.afterClosed().subscribe(dialogResult => {
			  comercio.estado = 'A';
			  if(dialogResult) {this.comercioService.accion(comercio)
			  .subscribe(() => this.getComercios());
			}
		 });
	}

	
	rechazar(comercio: Comercio): void {

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: "500px",
			data: {
				title: "¿Está seguro?",
				message: "Usted está apunto de rechazar un comercio. "}
		  });
		  dialogRef.afterClosed().subscribe(dialogResult => {
			  comercio.estado = 'R';
			  if(dialogResult) {this.comercioService.accion(comercio)
			  .subscribe(() => this.getComercios());
			}
		 });
	}
	
	verDireccion(comercio: Comercio): void {
		this.direccionService.getBy(comercio.direccion).subscribe((dir)=>{
			dir.latitud = Number(dir.latitud);
			dir.longitud = Number(dir.longitud);
			const dialogRef = this.dialog.open(DialogDireccion, {
				maxWidth: "500px",
				data: Object.assign({
					provincias: "",
					cantones: "",
					distritos: "",
					permitir: !false
				}, dir)
			  });
		});
	}
  
}