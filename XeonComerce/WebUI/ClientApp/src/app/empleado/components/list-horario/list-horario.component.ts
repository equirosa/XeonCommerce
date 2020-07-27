import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SeccionHorario } from '../../../_models/seccion-horario';
import { HorarioEmpleadoService } from '../../../_services/horario-empleado.service';
import * as moment from 'moment';
import { FormHorarioComponent } from '../form-horario/form-horario.component';
import { MatDialog } from '@angular/material/dialog';

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

 // idEmpleado = 1;  // Se obtiene segun el empleado que incio sesion o segun el empleado que selecciono el admin 

  //diaSemana  = 2; // Se obtiene segun el dia que se escoja en el component empleado-horario


  constructor(private horarioEmpleadoService: HorarioEmpleadoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarHorario();
  }

  ngOnChanges( changes: SimpleChanges): void {
    console.log(changes);    
    // this.diaSemana = changes.diaSemana.currentValue;
    // this.idEmpleado = changes.idEmple    
    this.cargarHorario();
  }


  cargarHorario(): void {
    // Arreglar para que regrese los horarios de un empleado especifico
    this.horarioEmpleadoService.getSeccionesHorario(this.idEmpleado, this.diaSemana).subscribe({
      next: res => {
        this.horario.data = res;
        this.formatearHoras();
      },
      error: err => console.log(err)
    });

  }

  editar(empleado): void {
    console.log(empleado);
    const dialogRef = this.dialog.open(FormHorarioComponent, {
      width: '650px',
      height: '400px',
      data: { tipo: 'editar', horario: empleado}
    });
  }

  eliminar(horario): void {
     console.log('horario', horario);
    this.horarioEmpleadoService.eliminar(horario.id).subscribe({
      next: res => {
        console.log('Se ha eliminado la seccion horario');
        this.cargarHorario();
      },
      error: err => console.log(err)
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
