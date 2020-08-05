import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Empleado } from '../../../_models/empleado';
import { EmpleadoService } from '../../../_services/empleado.service';
import { EmpleadoComercioSucursal } from '../../../_models/empleado-comercio-sucursal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../../_services/usuario.service';
import { Usuario } from '../../../_models/usuario';
import { VistaRol } from '../../../_models/vista-rol';
import { RolService } from '../../../_services/rol.service';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  //CedulaFormControl = new FormControl('', Validators.required);

  FormGroupEmpleado = new FormGroup({
    Cedula: new FormControl('', Validators.required),
    Rol: new FormControl('', Validators.required)
  });

  columnas: string[] = ['correoElectronico', 'telefono', 'cedula'];
  roles: VistaRol[];

  nuevoEmpleado = new EmpleadoComercioSucursal();
  idUsuario = '';

  usuarios = new MatTableDataSource<Usuario>();

  mostrarUsuarios = false;


  // Estos valores se obtienen segun el usuario comercio que inicia sesion y la sucursal a la  que ingresa
  // idComercio = '3101555';
  // idSucursal = '3101555-1';
  idComercio = '';
  idSucursal = '';

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private empleadoService: EmpleadoService,
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private rolService: RolService) { }

  ngOnInit(): void {
    this.idComercio = this.data.idComercio;
    this.idSucursal = this.data.idSucursal;

    this.cargarUsuarios();
    this.cargarRoles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usuarios.filter = filterValue.trim().toLowerCase();
    this.mostrarUsuarios = true;
  }

  verificarUsuario(): void {

    this.idUsuario = this.FormGroupEmpleado.get('Cedula').value;

    this.empleadoService.verificarUsuario(this.idUsuario).subscribe({
      next: res => {
        if(res){
          // Implementar dialog que diga que no existe un usuario con esa cedula
          this.idUsuario = res.toString();
          this.guardarUsuario();
        }
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
      this.nuevoEmpleado.idRol = this.FormGroupEmpleado.get('Rol').value;

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

  habilitarMostrarUsuarios(): void {
    this.mostrarUsuarios = true; 

  }

  cargarUsuarios(): void {
    this.usuarioService.get().subscribe({
      next: res => {
        this.usuarios.data = res.filter( u => u.tipo === 'U');
      },
      error: err => console.log(err)
    });
  }

  cargarRoles(): void {
    this.rolService.getRoles(this.idComercio).subscribe({
      next: res => {
        this.roles = res;
      },
      error: err => console.log(err)
    });
  }


}
