import { Component, OnInit, ViewChild, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { EmpleadoService } from '../../../_services/empleado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from '../../../_models/empleado';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PerfilEmpleadoComponent } from '../perfil-empleado/perfil-empleado.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {


  @Input()
  actualizarDatos: boolean;

  @Input()
  idSucursal = '';

  // idSucursal = '3101555-1';

  empleados = new MatTableDataSource<Empleado>();

  nombresColumnas: string[];

  
  columnas = [
    { header: 'Nombre', binding: 'nombre' },
    { header: 'Apellido', binding: 'apellidoUno'},
    { header: 'Telefono', binding: 'numeroTelefono'},
    { header: 'Correo Eléctronico', binding: 'correoElectronico'}
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empleados.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private empleadoService: EmpleadoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.nombresColumnas = this.columnas.map(c => c.binding);
    this.nombresColumnas.push('horario');
    this.nombresColumnas.push('perfil');
    this.nombresColumnas.push('eliminar');

  }

  ngOnChanges(changes: SimpleChanges): void{

    if( changes.actualizarDatos && changes.actualizarDatos.currentValue){
     this.cargarEmpleados();
    }

    if( changes.idSucursal) {
      if( changes.idSucursal.currentValue === ''){
        this.empleados.data = [];
      } else {
        this.cargarEmpleados();
      }
    } 

    // if()

    // if( changes.actualizarDatos || changes.idSucursal ){
    //   this.cargarEmpleados();
    // } else if(changes.idSucursal.currentValue === '') {
    //   this.empleados.data = [];
    // }

    // if(changes){
    //   this.cargarEmpleados();
    // }else {
    //   this.empleados.data = [];
    // }

    // if( (changes.idSucursal.currentValue && changes.idSucursal.currentValue !== '') || (changes.actualizarDatos.currentValue)){
    //   this.cargarEmpleados();
    // }else {
    //   this.empleados.data = [];
    // }


  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados(this.idSucursal).subscribe({
      next: res => {
        this.empleados.data = res;
      },
      error: err => console.log(err)
    });
  }

  eliminar(empleado): void {
    this.empleadoService.eliminar(empleado.idEmpleado).subscribe({
      next: res => {
        this._snackBar.open('Se ha eliminado el empleado', '', {
          duration: 2500,
        });
        this.cargarEmpleados();
      },
      error: err => {
        this._snackBar.open('No se logro eliminar empleado', '', {
          duration: 2500,
        });
      }
    });
  }

  verPerfil(empleado): void {
    const dialogRef = this.dialog.open(PerfilEmpleadoComponent, {
      width: '600px',
      height: '450px',
      data: empleado
    });
  }

  verHorario(empleado): void {
    this.router.navigate([`/empleado/horario`, empleado.idEmpleado], { fragment: empleado.nombre});
  }
}
