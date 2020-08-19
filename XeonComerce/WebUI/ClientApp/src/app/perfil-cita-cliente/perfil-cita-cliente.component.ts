import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { MensajeService } from './../_services/mensaje.service';
import { CitaService } from './../_services/cita.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitaProducto } from '../_models/cita-producto';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../_models/producto';

@Component({
  selector: 'app-perfil-cita-cliente',
  templateUrl: './perfil-cita-cliente.component.html',
  styleUrls: ['./perfil-cita-cliente.component.css']
})
export class PerfilCitaClienteComponent implements OnInit {

  cita: CitaProducto;

  formGroupDatos = new FormGroup({
    Fecha: new FormControl('', Validators.required),
    Tipo: new FormControl('', Validators.required)
  });

  columnas: string[] = ['nombre', 'cantidad'];

  productos = new MatTableDataSource<Producto>();

  constructor( 
	public dialogRef: MatDialogRef<PerfilCitaClienteComponent>, 
	public citaService: CitaService,
	public mensajeService: MensajeService,
	public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.cita = this.data.cita;
    this.llenarDatos();
    this.productos.data = this.cita.productos;
  }


  llenarDatos(): void {
    this.formGroupDatos.get('Fecha').setValue(moment(this.cita.horaFinal).format('YYYY-MM-DD'));
    this.formGroupDatos.get('Tipo').setValue(this.cita.tipo === 'P' ? 'Producto' : 'Servicio');
  }

  cancelar(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        title: '¿Está seguro?',
        message: 'Usted está apunto de cancelar una cita, puede ser multado por esto.'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult){
		  let a : CitaProducto;
		  a = this.cita;
		  a.horaInicio = a.horaFinal; 
        this.citaService.cancelarUsr(this.cita).subscribe((r)=>{
			if(r){
				this.mensajeService.add("Se ha cancelado la cita");
			}
		});
	}
  });
}

}
