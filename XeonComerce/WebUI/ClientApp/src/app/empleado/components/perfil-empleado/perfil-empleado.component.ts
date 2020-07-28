import { Component, OnInit, Inject } from '@angular/core';
import { Empleado } from '../../../_models/empleado';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {

  empleado = new Empleado();
  
  constructor( 
    public dialogRef: MatDialogRef<PerfilEmpleadoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Empleado,
    private router: Router) { 
  }

  ngOnInit(): void {    
    this.empleado = this.data;
    this.formatearFecha();
  }

  formatearFecha(): void {
    moment.locale('es');
    this.empleado.fechaNacimiento = moment(this.empleado.fechaNacimiento).format('MMM Do YYYY');

  }

  
}
