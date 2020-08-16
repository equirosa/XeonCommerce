import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CitaService } from '../_services/cita.service';
import { CitaProducto } from '../_models/cita-producto';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-cita-comercio',
  templateUrl: './list-cita-comercio.component.html',
  styleUrls: ['./list-cita-comercio.component.css']
})
export class ListCitaComercioComponent implements OnInit {

  idComercio = '31015606';
  citas = new MatTableDataSource<CitaProducto>();
  columnas: string[] = ['sucursal', 'fecha', 'estado', 'tipo', 'ver', 'cancelar'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.citas.filter = filterValue.trim().toLowerCase();
  }

  constructor( private citaService: CitaService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.get().subscribe({
      next: res => {
        this.citas.data = res.filter( c => c.idComercio === this.idComercio);
        console.log(this.citas.data);
      }, error: err => console.log(err)
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
