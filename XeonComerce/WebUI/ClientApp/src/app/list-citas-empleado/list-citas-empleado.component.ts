import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CitaService } from '../_services/cita.service';
import { CitaProducto } from '../_models/cita-producto';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FinalizarCitaEmpleadoComponent } from '../finalizar-cita-empleado/finalizar-cita-empleado.component';
import * as moment from 'moment';
import { ScannerQrComponent } from '../scanner-qr/scanner-qr.component';

@Component({
  selector: 'app-list-citas-empleado',
  templateUrl: './list-citas-empleado.component.html',
  styleUrls: ['./list-citas-empleado.component.css']
})
export class ListCitasEmpleadoComponent implements OnInit {

  idEmpleado: number;
  hoy: Date;

  citas = new MatTableDataSource<CitaProducto>();
  columnas: string[] = ['sucursal', 'fecha', 'estado', 'tipo', 'scanner', 'finalizar'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.citas.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private citaService: CitaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute) {
      this.hoy = new Date();
     }

	 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.idEmpleado = JSON.parse(localStorage.getItem('user')).empleado.id;
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.get().subscribe({
      next: res => {
        this.citas.data = res.filter( c => c.idEmpleado === this.idEmpleado && c.estado === 'P' );
		this.citas.paginator = this.paginator;
		this.citas.sort = this.sort;
        this.formatearFecha();
      },
      error: err => {
        console.log(err);
      }
    });
  }


  finalizar(cita: CitaProducto): void {
    const dialogRef = this.dialog.open(FinalizarCitaEmpleadoComponent, {
      width: '650px',
      height: '500px',
      data: {cita}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.cargarCitas();
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

  scanner(cita: CitaProducto): void {
    const dialogRef = this.dialog.open(ScannerQrComponent, {
      width: '500px',
      height: '500px',
      data: {cita}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.cargarCitas();
    });

  }
}
