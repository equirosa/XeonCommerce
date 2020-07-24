import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Empleado } from '../../../_models/empleado';
import { EmpleadoService } from '../../../_services/empleado.service';
import { User } from '../../../_models/user';
import { EmpleadoComercioSucursal } from '../../../_models/empleado-comercio-sucursal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  //CedulaFormControl = new FormControl('', Validators.required);

  FormGroupEmpleado = new FormGroup({    
    Cedula: new FormControl('', Validators.required)
  });

  nuevoEmpleado = new EmpleadoComercioSucursal();
  idUsuario = '';

  // Estos valores se obtienen segun el usuario comercio que inicia sesion y la sucursal a la  que ingresa
  idComercio = '3101555';
  idSucursal = '3101555-1';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private empleadoService: EmpleadoService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  verificarUsuario(): void {

    this.idUsuario = this.FormGroupEmpleado.get('Cedula').value;

    this.empleadoService.verificarUsuario(this.idUsuario).subscribe({
      next: res => {
        this.idUsuario = res.toString();
        this.guardarUsuario();
      },
      error: err => console.log(err)
    });
  }

  guardarUsuario(): void {
    if(this.idUsuario != null && this.FormGroupEmpleado && this.FormGroupEmpleado.valid ){
      this.nuevoEmpleado.id = 0;
      this.nuevoEmpleado.idUsuario = this.idUsuario;
      this.nuevoEmpleado.idComercio =  this.idComercio;
      this.nuevoEmpleado.idSucursal = this.idSucursal;
      this.nuevoEmpleado.estado = 'A';

      this.empleadoService.create(this.nuevoEmpleado).subscribe({
        next: res => {

          this._snackBar.open('Se ha registrado el empleado', '', {
            duration: 2500,
          });
        },
        error: err => console.log(err)
      });

    } else {
      this._snackBar.open('No se ha logrado registrar el empleado', '', {
        duration: 2500,
      });
    }
  }


}
