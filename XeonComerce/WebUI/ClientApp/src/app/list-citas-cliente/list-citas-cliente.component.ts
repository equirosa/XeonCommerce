import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CitaService } from '../_services/cita.service';
import { CitaProducto } from '../_models/cita-producto';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilCitaClienteComponent } from '../perfil-cita-cliente/perfil-cita-cliente.component';


@Component({
  selector: 'app-list-citas-cliente',
  templateUrl: './list-citas-cliente.component.html',
  styleUrls: ['./list-citas-cliente.component.css']
})
export class ListCitasClienteComponent implements OnInit {

  idCliente: number;
  hoy: Date;

  citas = new MatTableDataSource<CitaProducto>();
  columnas: string[] = ['sucursal', 'fecha', 'estado', 'tipo', 'ver'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.citas.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private citaService: CitaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,) { }
 

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.idCliente = JSON.parse(localStorage.getItem('user')).id;
    this.cargarCitas();
  }


  cargarCitas(): void {
    this.citaService.get().subscribe({
      next: res => {
        this.citas.data = res.filter( c => c.idCliente === this.idCliente && c.estado === 'P' );
        this.convertirFecha();
        this.formatearFecha();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ver(cita: CitaProducto): void {
    const dialogRef = this.dialog.open(PerfilCitaClienteComponent, {
      width: '600px',
      height: '500px',
      data: {cita}
    });
  }

  convertirFecha(): void {
    this.citas.data.map( c => {
      c.horaFinal = new Date(c.horaFinal);
    });
  }

  formatearFecha(): void {
    this.citas.data = this.citas.data.map( c => {
      const horaI = moment( c.horaInicio );
      c.horaInicio = horaI.format('DD-MM-YYYY');
      return c;
    });
  }
}
