import { Component, OnInit } from '@angular/core';
import { FormEmpleadoComponent } from '../../components/form-empleado/form-empleado.component';
import { MatDialog } from '@angular/material/dialog';
import { FormHorarioComponent } from '../../components/form-horario/form-horario.component';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../../_services/empleado.service';

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
  idEmpleado: number; 
  nombreEmpleado: string;

  actualizarDatos = false;

  constructor( private empleadoService: EmpleadoService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idEmpleado = Number( this.route.snapshot.paramMap.get('idEmpleado') );
    this.route.fragment.subscribe( res => {
      this.nombreEmpleado = res;
    });
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
