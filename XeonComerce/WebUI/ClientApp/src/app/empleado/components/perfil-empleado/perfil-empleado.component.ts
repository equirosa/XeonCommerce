import { Component, OnInit, Inject } from '@angular/core';
import { Empleado } from '../../../_models/empleado';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { RolService } from '../../../_services/rol.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { VistaRol } from '../../../_models/vista-rol';
import { EmpleadoComercioSucursal } from '../../../_models/empleado-comercio-sucursal';
import { EmpleadoService } from '../../../_services/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {

  empleado = new Empleado();
  rolEmpleado: string;

  FormGroupRol = new FormGroup({
    Rol: new FormControl('', Validators.required)
  });

  roles: VistaRol[];
  guardar = false;

  constructor(
    public dialogRef: MatDialogRef<PerfilEmpleadoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Empleado,
    private router: Router,
    private _snackBar: MatSnackBar,
    private rolService: RolService,
    private empleadoService: EmpleadoService) {
  }

  ngOnInit(): void {
    this.empleado = this.data;
    this.rolService.getRol(this.data.idRol).subscribe({
      next: res => {
        this.rolEmpleado = res.nombre;
      },
      error: err => console.log(err)
    });

    this.cargarRoles();
    this.formatearFecha();

    this.FormGroupRol.valueChanges.subscribe({
      next: () => {
        if ( this.FormGroupRol.get('Rol').value ){
          this.guardar = true;
        } else {
          this.guardar = false;
        }
      }
    });
  }


  cargarRoles(): void {
    this.rolService.getRoles(this.empleado.idComercio).subscribe({
      next: res => {
        this.roles = res;
      },
      error: err => console.log(err)
    });
  }

  formatearFecha(): void {
    moment.locale('es');
    this.empleado.fechaNacimiento = moment(this.empleado.fechaNacimiento).format('MMM Do YYYY');
  }

  guardarRol(): void {
    
    var empleadoComercioSucursal = new EmpleadoComercioSucursal();
    empleadoComercioSucursal.id = this.empleado.idEmpleado;
    empleadoComercioSucursal.idUsuario = this.empleado.idUsuario;
    empleadoComercioSucursal.idComercio = this.empleado.idComercio;
    empleadoComercioSucursal.idSucursal = this.empleado.idSucursal;
    empleadoComercioSucursal.estado = this.empleado.estado;
    empleadoComercioSucursal.idRol = this.FormGroupRol.get('Rol').value;


    this.empleadoService.actualizar(empleadoComercioSucursal).subscribe({
      next: res => {
        this._snackBar.open('Se ha asigando el nuevo rol al empleado', '', {
          duration: 2500,
        });
      },
      error: err => {
        this._snackBar.open('No se asigno el nuevo rol al empelado', '', {
          duration: 2500,
        });
      }
    });
  }
}
