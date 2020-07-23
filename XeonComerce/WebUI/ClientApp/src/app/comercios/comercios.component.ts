import { Ubicacion } from './../_models/ubicacion';
import { Comercio } from '../_models/comercio';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ComercioService } from '../_services/comercio.service';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.css']
})
export class ComerciosComponent implements OnInit {

	comercios: Comercio[];
	comercioCrear: Comercio;
	displayedColumns: string[] = ['cedJuridica', 'nombreComercial', 'correoElectronico', 'telefono', 'direccion', 'idUsuario', 'editar', 'eliminar'];
	datos;
	provincias: Ubicacion[];
	cantones: Ubicacion[];
	distritos: Ubicacion[];
	
	constructor(public dialog: MatDialog, private comercioService: ComercioService, private mensajeService: MensajeService, private ubicacionService: UbicacionService) { }
  

	@ViewChild(MatSort, {static: true}) sort: MatSort;

	
	  ngOnInit() {
	  this.getComercios();
	  this.getProvincias();
	}
	
	filtrar(event: Event) {
		const filtro = (event.target as HTMLInputElement).value;
		this.datos.filter = filtro.trim().toLowerCase();
	  }
  


	  getProvincias(): void {
		this.ubicacionService.getProvincias()
		.subscribe(provincias => this.provincias = Object.keys(provincias).map(key => ({value: Number(key), nombre: provincias[key]})));
	  }


	abrirCrear(): void {
	  const dialogRef = this.dialog.open(DialogComercio, {
		width: '500px',
		data: {
		  accion: "crear",
		  permitir: !true,
		  cedJuridica: "",
		  nombreComercial: "",
		  correoElectronico: "",
		  telefono: "",
		  direccion: "",
		  idUsuario: "",
		  provincias: this.provincias,
		  cantones: this.cantones,
		  distritos: this.distritos,
		  provincia: "",
		  canton: "",
		  distrito: "",
		  lat: "",
		  long: "",
		  dir: true,
		  sennas: ""
		}
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {
			//Revisar si están los datos de dir y crearla retornar el id y ya.
		  this.comercioService.create(result)
			.subscribe(() => this.getComercios());
		}
  
	  });
	}
  
  
	abrirEditar(comercio: Comercio): void {
	  const dialogRef = this.dialog.open(DialogComercio, {
		width: '500px',
		data: {
		  accion: "editar",
		  permitir: !false,
		  cedJuridica: comercio.cedJuridica,
		  nombreComercial: comercio.nombreComercial,
		  correoElectronico: comercio.correoElectronico,
		  telefono: comercio.telefono,
		  direccion: comercio.direccion,
		  idUsuario: comercio.idUsuario,
		  provincias: this.provincias,
		  cantones: this.cantones,
		  distritos: this.distritos,
		  provincia: "",
		  canton: "",
		  distrito: "",
		  lat: "",
		  long: "",
		  dir: false,
		  sennas: ""
		}
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {
  
		  this.comercioService.update(result)
			.subscribe(() => this.getComercios());
		}
  
	  });
	}
  
	
	  getComercios(): void {
		this.comercioService.get()
		.subscribe(comercios => {
			this.comercios = comercios.sort((a, b) => {
				return a.nombreComercial.localeCompare(b.nombreComercial);
			  });
			this.datos = new MatTableDataSource(this.comercios);
			this.datos.sort = this.sort;
		});
	}
  
  
	delete(comercio: Comercio): void {
	  this.comercioService.delete(comercio)
		.subscribe(() => this.getComercios());
	}
  
}


@Component({
	selector: 'dialog-comercio',
	templateUrl: 'editar.html',
  })
  export class DialogComercio {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogComercio>,
	  @Inject(MAT_DIALOG_DATA) public data: Comercio, 
	  private ubicacionService: UbicacionService) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}

	
	getCantonesE(event: Event): void {
		console.log("Recibido");
		let provincia = event.value;
		console.log(event.value)
		this.ubicacionService.getCantones(provincia)
		.subscribe(cantones => this.data.cantones = Object.keys(cantones).map(key => ({value: Number(key), nombre: cantones[key]})));
	  }

	
	getDistritosE(event: Event): void {
		console.log("Recibido");
		let canton = event.value;
		console.log(event.value)
		this.ubicacionService.getDistritos(this.data.provincia, canton)
		.subscribe(distritos => this.data.distritos = Object.keys(distritos).map(key => ({value: Number(key), nombre: distritos[key]})));
	  }

  }
  