import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitaProducto } from '../_models/cita-producto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.cita = this.data.cita;
    this.llenarDatos();
    this.productos.data = this.cita.productos;
  }


  llenarDatos(): void {
    this.formGroupDatos.get('Fecha').setValue(moment(this.cita.horaFinal).format('YYYY-MM-DD'));
    this.formGroupDatos.get('Tipo').setValue(this.cita.tipo === 'P' ? 'Producto' : 'Servicio');
  }
}
