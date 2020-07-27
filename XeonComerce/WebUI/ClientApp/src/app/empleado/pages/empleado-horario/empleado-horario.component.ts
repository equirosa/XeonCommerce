import { Component, OnInit } from '@angular/core';
import { FormEmpleadoComponent } from '../../components/form-empleado/form-empleado.component';
import { MatDialog } from '@angular/material/dialog';
import { FormHorarioComponent } from '../../components/form-horario/form-horario.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleado-horario',
  templateUrl: './empleado-horario.component.html',
  styleUrls: ['./empleado-horario.component.css']
})
export class EmpleadoHorarioComponent implements OnInit {

  dias = [
    {valor: 2, nombre: 'Lunes'},
    {valor: 3, nombre: 'Martes'},
    {valor: 4, nombre: 'Miércoles'},
    {valor: 5, nombre: 'Jueves'},
    {valor: 6, nombre: 'Viernes'},
    {valor: 7, nombre: 'Sabado'},
    {valor: 1, nombre: 'Domingo'}
  ];

  FormGroupHorario: FormGroup;
  diaSemana = this.dias[0].valor;
  idEmpleado = 1;

  actualizarDatos = false;

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  selectDia(event: Event){
    this.diaSemana = Number((event.target as HTMLSelectElement).value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormHorarioComponent, {
      width: '650px',
      height: '400px',
      data: {tipo: 'registrar', idEmpleado: this.idEmpleado, diaSemana : this.diaSemana}
    });

    dialogRef.afterClosed().subscribe( result => {
      this.actualizarDatos = !this.actualizarDatos;
    });
  }
 
}
