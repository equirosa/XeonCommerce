import { Component, OnInit, Inject } from '@angular/core';
import { Empleado } from '../../../_models/empleado';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {

  empleado: Empleado;

  constructor( public dialogRef: MatDialogRef<PerfilEmpleadoComponent>, @Inject(MAT_DIALOG_DATA) public data: Empleado) { 
    this.empleado = this.data; 
  }

  ngOnInit(): void {    
    
  }


}
