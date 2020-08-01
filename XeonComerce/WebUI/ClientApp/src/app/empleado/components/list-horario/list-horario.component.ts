import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SeccionHorario } from '../../../_models/seccion-horario';
import { HorarioEmpleadoService } from '../../../_services/horario-empleado.service';
import * as moment from 'moment';
import { FormHorarioComponent } from '../form-horario/form-horario.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../_components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-horario',
  templateUrl: './list-horario.component.html',
  styleUrls: ['./list-horario.component.css']
})
export class ListHorarioComponent implements OnInit {

  horario = new MatTableDataSource<SeccionHorario>();
  columnas: string[] = ['descripcion', 'horaInicio', 'horaFinal', 'editar', 'eliminar'];

  @Input()
  idEmpleado: number;

  @Input()
  diaSemana: number;

  @Input()
  actualizarDatos: boolean;


  constructor(private horarioEmpleadoService: HorarioEmpleadoService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarHorario();
  }

  ngOnChanges( changes: SimpleChanges): void {
    this.cargarHorario();
  }


  cargarHorario(): void {
  //   Arreglar para que regrese los horarios de un empleado especifico
    this.horarioEmpleadoService.getSeccionesHorario(this.idEmpleado, this.diaSemana).subscribe({
      next: res => {
        this.horario.data = res;
        this.formatearHoras();
      },
      error: err => console.log(err)
    });

  }

  editar(horario): void {
    console.log(horario);
    const dialogRef = this.dialog.open(FormHorarioComponent, {
      width: '650px',
      height: '400px',
      data: { tipo: 'editar', horario: horario}
    });

    dialogRef.afterClosed().subscribe( res => {
      this.cargarHorario();
    });
  }

  eliminar(horario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
			data: {
			title: "¿Está seguro?",
				message: "Usted está apunto de eliminar una sección del horario."}
    }); 

    dialogRef.afterClosed().subscribe( dialogResult => {
      if(dialogResult){
        this.horarioEmpleadoService.eliminar(horario.id).subscribe({
          next: res => {
            this.cargarHorario();
            this._snackBar.open('Se ha eliminado la sección del horario', '', {
              duration: 2500,
            });
          },
          error: err => {
            this._snackBar.open('No se ha logrado eliminar la sección del horario', '', {
              duration: 2500,
            });
          }
        });
      }
    });
  }

  formatearHoras(): void {
    this.horario.data = this.horario.data.map( h => {
      const horaI = moment( h.horaInicio );
      const horaF = moment( h.horaFinal );
      h.horaInicio = horaI.format('hh:mm A');
      h.horaFinal = horaF.format('hh:mm A');
      return h;
    });
  }

}
