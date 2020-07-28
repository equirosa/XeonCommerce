import { ArchivoService } from './../_services/archivo.service';
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
import { UploadComercioFilesComponent } from '../crear-comercio/upload-comercio-files.dialog';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.css']
})
export class ComerciosComponent implements OnInit {

	comercios: Comercio[];
	comercioCrear: Comercio;
	displayedColumns: string[] = ['cedJuridica', 'nombreComercial', 'correoElectronico', 'telefono', 'documentos', 'direccion', 'idUsuario', 'editar', 'eliminar'];
	datos;
	provincias: Ubicacion[];
	cantones: Ubicacion[];
	distritos: Ubicacion[];
	direccion: Direccion;
	
	constructor(public dialog: MatDialog, private archivoService: ArchivoService, private comercioService: ComercioService, private direccionService: DireccionService, private mensajeService: MensajeService, private ubicacionService: UbicacionService) { }
  

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
		  estado: "P",
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
			console.log("Primero se crea una dirección");
			

			this.direccion = {
				id: -1,
				provincia: result.provincia,
				canton: result.canton,
				distrito: result.distrito,
				sennas: result.sennas,
				latitud: result.lat,
				longitud: result.long,
			}

			let direccionFinal: Direccion
			this.direccionService.create(this.direccion).subscribe(() => {
				this.direccionService.get()
				.subscribe(dirs => {
					dirs = dirs.filter((a) => {
						return (a.provincia == this.direccion.provincia && a.canton == this.direccion.canton && a.distrito == this.direccion.distrito && a.latitud == this.direccion.latitud && a.longitud == this.direccion.longitud && a.sennas == this.direccion.sennas);
					  });
					direccionFinal = dirs[0];
					if(direccionFinal){
						console.log("Direccion a registrar es: ", this.direccion);
						let comercioFinal : Comercio;
						comercioFinal = {
							"cedJuridica": result.cedJuridica,
							"nombreComercial": result.nombreComercial,
							"correoElectronico": result.correoElectronico,
							"telefono": result.telefono,
							"direccion": direccionFinal.id,
							"idUsuario": result.idUsuario,
							"estado": result.estado
						}
					this.comercioService.create(comercioFinal)
					.subscribe(() => {

						
			this.provincias = [];
			this.cantones = [];
			this.distritos = [];
			this.direccion = undefined;
			this.getProvincias();

						this.getComercios()
					});
					}else{
						console.log("Algo ocurrio al buscar el id de la direccion.");
					}

				});

			});
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
		  estado: comercio.estado,
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
			this.comercios = comercios.filter((a)=> a.estado == 'A');
			this.datos = new MatTableDataSource(this.comercios);
			this.datos.sort = this.sort;
		});
	}
  
  
	delete(comercio: Comercio): void {

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: "500px",
			data: {
				title: "¿Está seguro?",
				message: "Usted está apunto de eliminar un comercio. "}
		  });
		
		  dialogRef.afterClosed().subscribe(dialogResult => {
			  if(dialogResult) this.comercioService.delete(comercio)
			  .subscribe(() => this.getComercios());
		 });
	}
  

	
  
	verDireccion(comercio: Comercio): void {
		this.direccionService.getBy(comercio.direccion).subscribe((dir)=>{
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

	
	verDocumentos(comercio: Comercio): void {
		this.direccionService.getBy(comercio.direccion).subscribe((dir)=>{
			const dialogRef = this.dialog.open(DialogArchivo, {
				maxWidth: "500px",
				data: { cedJuridica: comercio.cedJuridica }
			  });
		});
	}
}


@Component({
	selector: 'dialog-comercio',
	templateUrl: 'editar.html',
  })
  export class DialogComercio {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogComercio>,
	  @Inject(MAT_DIALOG_DATA) public data: any, 
	  private ubicacionService: UbicacionService) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}

	
	getCantonesE(event: any): void {
		console.log("Recibido");
		let provincia = event.value;
		console.log(event.value)
		this.ubicacionService.getCantones(provincia)
		.subscribe(cantones => this.data.cantones = Object.keys(cantones).map(key => ({value: Number(key), nombre: cantones[key]})));
	  }

	
	getDistritosE(event: any): void {
		console.log("Recibido");
		let canton = event.value;
		console.log(event.value)
		this.ubicacionService.getDistritos(this.data.provincia, canton)
		.subscribe(distritos => this.data.distritos = Object.keys(distritos).map(key => ({value: Number(key), nombre: distritos[key]})));
	  }

  }
  


  
@Component({
	selector: 'dialog-direccion',
	templateUrl: 'direccion.html',
  })
  export class DialogDireccion implements OnInit {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogComercio>,
	  @Inject(MAT_DIALOG_DATA) public data: any, 
	  private ubicacionService: UbicacionService) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(){
		this.getProvincias();
		this.getCantonesE({value:this.data.provincia});
		this.getDistritosE({value: this.data.canton});
	}

	
	getProvincias(): void {
		console.log("provincias");
		this.ubicacionService.getProvincias()
		.subscribe(provincias => this.data.provincias = Object.keys(provincias).map(key => ({value: Number(key), nombre: provincias[key]})));
	  }
	
		
	  getCantonesE(event: any): void {
		console.log("Recibido");
		let provincia = event.value;
		console.log(event.value)
		this.ubicacionService.getCantones(provincia)
		.subscribe(cantones => this.data.cantones = Object.keys(cantones).map(key => ({value: Number(key), nombre: cantones[key]})));
	  }

	
	getDistritosE(event: any): void {
		console.log("Recibido");
		let canton = event.value;
		console.log(event.value)
		this.ubicacionService.getDistritos(this.data.provincia, canton)
		.subscribe(distritos => this.data.distritos = Object.keys(distritos).map(key => ({value: Number(key), nombre: distritos[key]})));
	  }


  }
  

  
  
@Component({
	selector: 'dialog-archivo',
	templateUrl: 'archivo.html',
  })
  export class DialogArchivo implements OnInit {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogArchivo>,
	  @Inject(MAT_DIALOG_DATA) public data: any, 
	  private archivoService: ArchivoService) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(){
		this.archivoService.get().subscribe(archivos=>{
			//agregar esto para el otro componente.
			archivos = archivos.filter((i)=>i.idComercio==this.data.cedJuridica);
			this.data.archivos = archivos;
		})
	}



  }
  