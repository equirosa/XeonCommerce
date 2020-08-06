import { Bitacora } from './../_models/bitacora';
import { BitacoraService } from './../_services/bitacora.service';
import { AccountService } from '@app/_services';
import { User } from '@app/_models';
import { MatPaginator } from '@angular/material/paginator';
import { DialogComercio } from './../comercios/comercios.component';
import { CategoriaService } from './../_services/categoria.service';
import { Categoria } from './../_models/categoria';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

	user: User;
	categorias: Categoria[];
	categoriaCrear: Categoria;
	displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'editar', 'eliminar'];
	datos;
	
	constructor(public dialog: MatDialog, private mensajeService: MensajeService, private ubicacionService: UbicacionService, private categoriaService: CategoriaService,
		private bitacoraService: BitacoraService, private accountService : AccountService) { this.user = this.accountService.userValue; }
  

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	
	ngOnInit() {
	  this.getCategorias();
	}
	
	filtrar(event: Event) {
		const filtro = (event.target as HTMLInputElement).value;
		this.datos.filter = filtro.trim().toLowerCase();
	}


	abrirCrear(): void {
	  const dialogRef = this.dialog.open(DialogCategoria, {
		width: '500px',
		data: {
		  accion: "crear",
		  permitir: !true,
		  id: -1,
		  valor: "",
		  descripcion: ""
		}
  
	  });

  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {
			this.categoriaCrear = {
				id: result.id,
				valor: result.valor,
				descripcion: result.descripcion
			}
			if(result.valor && result.valor.length > 0 && result.descripcion && result.descripcion.length > 0 && result.valor.replace(/\s/g, '').length && result.descripcion.replace(/\s/g, '').length){	
				this.categoriaService.create(this.categoriaCrear).subscribe(() => {
				this.getCategorias();
				var log: Bitacora;
				log = {
					idUsuario: this.user.id,
					accion: "Creación de categoría",
					detalle: `Se creó una categoría (${result.valor})`,
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
  
  
	abrirEditar(categoria : Categoria): void {
	  const dialogRef = this.dialog.open(DialogCategoria, {
		width: '500px',
		data: {
		  accion: "editar",
		  permitir: !false,
		  id: categoria.id,
		  valor: categoria.valor,
		  descripcion: categoria.descripcion
		}
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {

			if(result.valor && result.valor.length > 0 && result.descripcion && result.descripcion.length > 0 && result.valor.replace(/\s/g, '').length && result.descripcion.replace(/\s/g, '').length){
				this.categoriaService.update(result)
			.subscribe(() => {
				this.getCategorias()
			
			
				var log: Bitacora;
				log = {
					idUsuario: this.user.id,
					accion: "Actualización de categoría",
					detalle: `Se actualizó una categoría (${result.valor})`,
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
  
	
	  getCategorias(): void {
		this.categoriaService.get()
		.subscribe(categorias => {
			this.categorias = categorias.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
			this.datos = new MatTableDataSource(this.categorias);
			this.datos.sort = this.sort;
			this.datos.paginator = this.paginator;
		});
	}
  
  
	delete(categoria: Categoria): void {

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: "500px",
			data: {
				title: "¿Está seguro?",
				message: "Usted está apunto de eliminar una categoria. "}
		  });
		
		  dialogRef.afterClosed().subscribe(dialogResult => {
			  if(dialogResult) this.categoriaService.delete(categoria)
			  .subscribe(() =>{ this.getCategorias();
			
				
				var log: Bitacora;
				log = {
					idUsuario: this.user.id,
					accion: "Eliminación de categoría",
					detalle: `Se eliminó una categoría (${categoria.valor})`,
					id: -1,
					fecha: new Date()
				}
			
				this.bitacoraService.create(log).subscribe();
			});
		 });
	}

}


@Component({
	selector: 'dialog-categoria',
	templateUrl: 'editar.html',
  })
  export class DialogCategoria {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogCategoria>,
	  @Inject(MAT_DIALOG_DATA) public data: any, 
	  private ubicacionService: UbicacionService) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}

  }