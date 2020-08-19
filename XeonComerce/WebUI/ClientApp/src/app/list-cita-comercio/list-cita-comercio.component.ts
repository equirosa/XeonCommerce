import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CitaService } from '../_services/cita.service';
import { CitaProducto } from '../_models/cita-producto';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-list-cita-comercio',
  templateUrl: './list-cita-comercio.component.html',
  styleUrls: ['./list-cita-comercio.component.css']
})
export class ListCitaComercioComponent implements OnInit {

  idComercio: string;
  citas = new MatTableDataSource<CitaProducto>();
  columnas: string[] = ['sucursal', 'fecha', 'estado', 'tipo', 'notificar' , 'cancelar'];

  // Consultado segun la configuracion del comercio
  diasAntelacion = 3;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.citas.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private citaService: CitaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
      this.idComercio = JSON.parse(localStorage.getItem('user')).comercio.cedJuridica;
     }
	 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.get().subscribe({
      next: res => {
        this.citas.data = res.filter( c => c.idComercio === this.idComercio).sort((a, b) => a.horaInicio - b.horaInicio);
		this.citas.paginator = this.paginator;
		this.citas.sort = this.sort;
        console.log(this.citas.data);
      }, error: err => console.log(err)
    });
  }

  habilitarNotificacion(cita: CitaProducto): boolean {
    const hoy = new Date();
    const diaCita = new Date(cita.horaFinal);
    const diff =  diaCita.getDate() - hoy.getDate();

    if ( diaCita.getFullYear() === hoy.getFullYear() &&
         diaCita.getMonth === hoy.getMonth && diff >= 0 && diff <= this.diasAntelacion ){
        return true;
    } else {
      return false;
    }
  }

  enviarNotificacion(cita: CitaProducto): void {
    this.citaService.notificar(cita).subscribe({
      next: res => {
        this._snackBar.open('Se ha notificado al cliente de la cita', '', {
          duration: 2500
        });
      },
      error: err => {
        this._snackBar.open('No se ha logrado notificar al cliente de la cita', '', {
          duration: 2500
        });
      }
    });

  }

  ver(cita: CitaProducto): void {

  }

  cancelar(cita: CitaProducto): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        title: '¿Está seguro?',
        message: 'Usted está apunto de cancelar una cita.'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult){
        this.citaService.cancelar(cita).subscribe({
          next: res => {
            this.cargarCitas();
            this._snackBar.open('Se ha cancelado la cita', '', {
              duration: 2500
            });
          },
          error: err => {
            this._snackBar.open(err, '', {
              duration: 2500
            });
          }
        });
      }
    });

  }
}
