import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from './../_models/usuario';
import { UsuarioService } from './../_services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { Bitacora } from './../_models/bitacora';
import { BitacoraService } from './../_services/bitacora.service';
import { UbicacionService } from './../_services/ubicacion.service';
import { MensajeService } from './../_services/mensaje.service';
import { ComercioService } from './../_services/comercio.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
	displayedColumns: string[] = ['id', 'fecha', 'detalle', 'accion', 'idUsuario', 'verUsuario'];
	datos;
	logs: Bitacora[];
  constructor(public dialog: MatDialog, private comercioService: ComercioService, private mensajeService: MensajeService, 
	private ubicacionService: UbicacionService, private bitacoraService : BitacoraService) { }
  

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
	  this.getLogs();
  }

  filtrar(event: Event) {
	const filtro = (event.target as HTMLInputElement).value;
	this.datos.filter = filtro.trim().toLowerCase();
  }

  getLogs(): void {
	this.bitacoraService.get()
	.subscribe(logs => {
		this.logs = logs.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
		  console.log(this.logs)
		this.datos = new MatTableDataSource(this.logs);
		this.datos.sort = this.sort;
		this.datos.paginator = this.paginator;
	});

}


verUsuario(id: string): void {
		const dialogRef = this.dialog.open(DialogUsuario, {
			maxWidth: "500px",
			data: {
				id: id
			}
	});
}

}



@Component({
	selector: 'dialog-usuario',
	templateUrl: 'usuario.html',
  })
  export class DialogUsuario implements OnInit {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogUsuario>,
	  @Inject(MAT_DIALOG_DATA) public data: any, 
	  private usuarioService: UsuarioService) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(){
		console.log(this.data.id);
		this.usuarioService.getBy(this.data.id).subscribe(user=>{
			this.data = user;
			console.log(this.data);
		})
	}



  }
  