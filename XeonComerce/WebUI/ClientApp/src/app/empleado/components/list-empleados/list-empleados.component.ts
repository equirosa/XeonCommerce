import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadoService } from '../../../_services/empleado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from '../../../_models/empleado';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {



  empleados = new MatTableDataSource<Empleado>();

  columnas = [
    { header: 'Nombre', binding: 'nombre' },
    { header: 'Apellido', binding: 'apellidoUno'},
    { header: 'Telefono', binding: 'numeroTelefono'}
  ];


  nombresColumnas: string[];

  idSucursal = '3101555-1';

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.nombresColumnas = this.columnas.map(c => c.binding);
    
  }
  
  cargarEmpleados(): void {
    this.empleadoService.getEmpleados(this.idSucursal).subscribe({
      next: res => {
        this.empleados.data = res;     
      }, 
      error: err => console.log(err)
    });

  }
}
