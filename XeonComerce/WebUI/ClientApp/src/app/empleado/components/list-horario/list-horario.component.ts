import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SeccionHorario } from '../../../_models/seccion-horario';
import { HorarioEmpleadoService } from '../../../_services/horario-empleado.service';

@Component({
  selector: 'app-list-horario',
  templateUrl: './list-horario.component.html',
  styleUrls: ['./list-horario.component.css']
})
export class ListHorarioComponent implements OnInit {

  horario = new MatTableDataSource<SeccionHorario>();
  columnas: string[] = ['descripcion', 'horaInicio', 'horaFinal', 'editar', 'eliminar'];

  idEmpleado = 1;  // Se obtiene segun el empleado que incio sesion o segun el empleado que selecciono el admin 
  diaSemana  = 2; // Se obtiene segun el dia que se escoja en el component empleado-horario

  constructor(private horarioEmpleadoService: HorarioEmpleadoService) { }

  ngOnInit(): void {
    this.cargarHorario();
  }


  cargarHorario(): void {
    // Arreglar para que regrese los horarios de un empleado especifico
    this.horarioEmpleadoService.getSeccionesHorario(this.idEmpleado, this.diaSemana).subscribe({
      next: res => {
        this.horario.data = res;
      },
      error: err => console.log(err)
    });

  }


}
