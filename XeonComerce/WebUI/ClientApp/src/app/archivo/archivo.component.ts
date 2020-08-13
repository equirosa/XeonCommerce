import { UploadComercioFilesComponent } from './../crear-comercio/upload-comercio-files.dialog';
import { DialogArchivo } from './../comercios/comercios.component';
import { ComercioService } from './../_services/comercio.service';
import { Comercio } from './../_models/comercio';
import { Archivo } from './../_models/archivo';
import { ArchivoService } from './../_services/archivo.service';
import { Bitacora } from '../_models/bitacora';
import { BitacoraService } from '../_services/bitacora.service';
import { AccountService } from '@app/_services';
import { User } from '@app/_models';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { throws } from 'assert';


@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

	user: User;
	comercio: Comercio;
	archivos: Archivo[];
	displayedColumns: string[] = ['id', 'nombre', 'tipo', 'ver', 'editar', 'eliminar'];
	datos;
	
	constructor(public dialog: MatDialog, private comercioService: ComercioService, private mensajeService: MensajeService, private archivoService: ArchivoService,
		private bitacoraService: BitacoraService, private accountService : AccountService) { this.user = this.accountService.userValue; }
  

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	
	ngOnInit() {

		this.comercioService.get().subscribe(comercios=>{
			this.comercio = comercios.find((i)=>i.idUsuario == this.user.id);
			if(this.comercio){
				this.getArchivos();
			}else{
				this.mensajeService.add("Solo el dueño del comercio puede administrar los archivos");
			}
		});
	}
	
	filtrar(event: Event) {
		const filtro = (event.target as HTMLInputElement).value;
		this.datos.filter = filtro.trim().toLowerCase();
	}


	abrirCrear(): void {
	  const dialogRef = this.dialog.open(UploadComercioFilesComponent, {
		width: '500px',
		data: {
			idComercio: this.comercio.cedJuridica
		}
	  });

	dialogRef.afterClosed().subscribe(result => {
		this.getArchivos();  
	});
	  
	}
  
  
	abrirEditar(archivo : Archivo): void {
		
	  const dialogRef = this.dialog.open(DialogEditarArchivo, {
		width: '500px',
		data: {
		  accion: "editar",
		  permitir: !false,
		  id: archivo.id,
		  nombre: archivo.nombre,
		  link: archivo.link,
		  tipo: archivo.tipo,
		  idComercio: archivo.idComercio
		}
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {

			if(result.nombre && result.nombre.length > 0){
				this.archivoService.update(result)
			.subscribe(() => {
				this.getArchivos()
			
			
				var log: Bitacora;
				log = {
					idUsuario: this.user.id,
					accion: "Actualización de archivo",
					detalle: `Se actualizó un archivo (${result.idComercio})`,
					id: -1,
					fecha: new Date()
				}
				this.bitacoraService.create(log).subscribe();
			});
			}else{
			this.mensajeService.add("Favor llenar los datos");	
			}

		}
  
	  });
	}
	
	  getArchivos(): void {
		this.archivoService.get()
		.subscribe(archivos => {
			this.archivos = archivos.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
			this.archivos = this.archivos.filter((i)=>i.idComercio==this.comercio.cedJuridica);

			this.datos = new MatTableDataSource(this.archivos);
			this.datos.sort = this.sort;
			this.datos.paginator = this.paginator;
		});
	}
  
	ver(archivo: Archivo): void {
		const dialogRef = this.dialog.open(DialogImagen, {
			maxWidth: "500px",
			data: {
				img: archivo.link
			}
		  });
	}

	delete(archivo: Archivo): void {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: "500px",
			data: {
				title: "¿Está seguro?",
				message: "Usted está apunto de eliminar un archivo. "}
		  });
		
		  dialogRef.afterClosed().subscribe(dialogResult => {
			  if(dialogResult) this.archivoService.delete(archivo)
			  .subscribe(() =>{ this.getArchivos();
			
				
				var log: Bitacora;
				log = {
					idUsuario: this.user.id,
					accion: "Eliminación de archivo",
					detalle: `Se eliminó un archivo (${this.comercio.cedJuridica})`,
					id: -1,
					fecha: new Date()
				}
			
				this.bitacoraService.create(log).subscribe();
			});
		 });
	}

}


@Component({
	selector: 'dialog-ver-imagen',
	templateUrl: 'ver.html',
  })
  export class DialogImagen {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogImagen>,
	  @Inject(MAT_DIALOG_DATA) public data: any) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}

	abrir(): void{
		window.open(this.data.img, "_blank");
		this.dialogRef.close();
	}
  }

  
@Component({
	selector: 'dialog-editar-arcivo',
	templateUrl: 'editar.html',
  })
  export class DialogEditarArchivo {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogEditarArchivo>,
	  @Inject(MAT_DIALOG_DATA) public data: any) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}

  }