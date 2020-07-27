import { Component, OnInit, ViewChild, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { EmpleadoService } from '../../../_services/empleado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from '../../../_models/empleado';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {


  @Input()
  actualizarDatos = false; 

  empleados = new MatTableDataSource<Empleado>();

  nombresColumnas: string[];

  // cargar: boolean; 


  idSucursal = '3101555-1';
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


  constructor(private empleadoService: EmpleadoService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.nombresColumnas = this.columnas.map(c => c.binding);
    this.nombresColumnas.push('editar');
    this.nombresColumnas.push('eliminar');

  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes.actualizarDatos.currentValue === true){
      this.cargarEmpleados();
      this.actualizarDatos = false; 
    }
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
}
