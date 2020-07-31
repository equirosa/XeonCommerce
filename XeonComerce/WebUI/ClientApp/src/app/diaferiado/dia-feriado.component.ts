import { PDF } from './../_models/pdf';
import { PDFService } from './../_services/pdf.service';
import { DiaFeriadoService } from './../_services/diaFeriado.service';
import { DiaFeriado } from './../_models/dia-feriado';
import { MatPaginator } from '@angular/material/paginator';
import { DialogComercio } from '../comercios/comercios.component';
import { CategoriaService } from '../_services/categoria.service';
import { Categoria } from '../_models/categoria';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { saveAs } from "file-saver";


@Component({ 
  selector: 'app-dia-feriado',
  templateUrl: './dia-feriado.component.html',
  styleUrls: ['./dia-feriado.component.css']
})
export class DiaFeriadoComponent implements OnInit {

	diasFeriados: DiaFeriado[];
	diaFeriadoCrear: DiaFeriado;
	displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'fecha', 'editar', 'eliminar'];
	datos;  
	
	constructor(public dialog: MatDialog, private mensajeService: MensajeService, private diaFeriadoService: DiaFeriadoService, private pdfService : PDFService) { }
  

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	
	ngOnInit() {
	  this.getDiasFeriados();
	}
	filtrar(event: Event) {
		const filtro = (event.target as HTMLInputElement).value;
		this.datos.filter = filtro.trim().toLowerCase();
	}


	abrirCrear(): void {
	  const dialogRef = this.dialog.open(DialogDiaFeriado, {
		width: '500px',
		data: {
		  accion: "crear",
		  permitir: !true,
		  id: -1,
		  fecha: "",
		  nombre: "",
		  descripcion: ""
		}
  
	  });

  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {
			this.diaFeriadoCrear = {
				id: result.id,
				fecha: result.fecha,
				nombre: result.nombre,
				descripcion: result.descripcion
			}

			this.diaFeriadoService.create(this.diaFeriadoCrear).subscribe(() => {
				this.getDiasFeriados();
			});
		}
  
	  });
	}
  
  
	abrirEditar(diaF : DiaFeriado): void {
	  const dialogRef = this.dialog.open(DialogDiaFeriado, {
		width: '500px',
		data: {
		  accion: "editar",
		  permitir: !false,
		  id: diaF.id,
		  fecha: diaF.fecha,
		  nombre: diaF.nombre,
		  descripcion: diaF.descripcion
		}
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {
  
		  this.diaFeriadoService.update(result)
			.subscribe(() => this.getDiasFeriados());
		}
  
	  });
	}
  
	getDiasFeriados(): void {
		this.diaFeriadoService.get()
		.subscribe(diasF => {
			this.diasFeriados = diasF.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
			this.datos = new MatTableDataSource(this.diasFeriados);
			this.datos.sort = this.sort;
			this.datos.paginator = this.paginator;
		});
	}
  
  
	delete(diaFeriado: DiaFeriado): void {

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: "500px",
			data: {
				title: "¿Está seguro?",
				message: "Usted está apunto de eliminar una categoria. "}
		  });
		
		  dialogRef.afterClosed().subscribe(dialogResult => {
			  if(dialogResult) this.diaFeriadoService.delete(diaFeriado)
			  .subscribe(() => this.getDiasFeriados());
		 });
	} 

	pdf(datos:any){
		let css = `<head>
		<style>
		table {
		  border-collapse: collapse;
		  width: 100%;
		}
		
		th, td {
		  text-align: left;
		  padding: 8px;
		}
		
		tr:nth-child(even){background-color: #f2f2f2}
		
		th {
		  background-color: #4CAF50;
		  color: white;
		}
		</style>
		</head>`;
		let dts = datos.data.reduce((acc, cv)=>{
			return acc+`
			<tr>
			<td>${cv.id}</td>
			<td>${cv.nombre}</td>
			<td>${cv.descripcion}</td>
			<td>${cv.fecha}</td>
			</tr>
			\n`;
		}, ""); 
		let html = css+`\n<h1>Días Feriados</h1>
		<table style="width:100%">
		<tr>
			<th>Id</th>
			<th>Nombre</th>
			<th>Descripción</th>
			<th>Fecha</th>
		</tr>
	      ${dts}
	  </table>`;

		let obj : PDF;
		obj = {
			nombre:"DiasFeriados",
			html: html
		};
		this.pdfService.descargar(obj).subscribe(data => {
			saveAs(data, obj.nombre+".pdf");
		  },
		  err => {
			this.mensajeService.add("Ocurrió un problema al exportar..");
			console.error(err);
		  });

	}

}


@Component({
	selector: 'dialog-dia-feriado',
	templateUrl: 'editar.html',
  })
  export class DialogDiaFeriado {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogDiaFeriado>,
	  @Inject(MAT_DIALOG_DATA) public data: any) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}

  }