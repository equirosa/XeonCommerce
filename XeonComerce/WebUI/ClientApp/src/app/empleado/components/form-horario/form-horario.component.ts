import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { SeccionHorario } from '../../../_models/seccion-horario';
import { HorarioEmpleadoService } from '../../../_services/horario-empleado.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-horario',
  templateUrl: './form-horario.component.html',
  styleUrls: ['./form-horario.component.css']
})
export class FormHorarioComponent implements OnInit {

  horaInicio: string;
  horaFinal: string;

 fechaHoraInicio = new Date(1900, 0, 1);
 fechaHoraFinal = new Date(1900, 0, 1);
 offset =  this.fechaHoraInicio.getTimezoneOffset();

 valid = false;

  FormGroupHorario = new FormGroup({
    HoraInicio: new FormControl('', Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)),
    HoraFinal: new FormControl('', Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)),
    Descripcion: new FormControl('', Validators.required),
    Estado: new FormControl('', Validators.required)
  });

  estados = [
    {valor: 'A', nombre: 'Activo'},
    {valor: 'D', nombre: 'Inactivo'}
  ];

  nuevaSeccionHorario = new SeccionHorario();

  constructor(
    private horarioEmpleadoService: HorarioEmpleadoService, 
    public dialogRef: MatDialogRef<FormHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
    ) {

      this.fechaHoraInicio.setMinutes(this.fechaHoraInicio.getMinutes() + this.offset);
      this.fechaHoraFinal.setMinutes(this.fechaHoraFinal.getMinutes() + this.offset);
     }


  ngOnInit(): void {
    if( this.data.tipo === 'editar'){
      this.nuevaSeccionHorario = this.data.horario;
      this.valid = true;
      
      this.horaInicio = this.convertir(this.nuevaSeccionHorario.horaInicio);
      this.horaFinal = this.convertir(this.nuevaSeccionHorario.horaFinal);
      this.llenarFormulario();
    }

    this.FormGroupHorario.get('HoraInicio').valueChanges.subscribe({
      next: () => {
        var res = this.FormGroupHorario.get('HoraInicio').value.split(':');
        this.fechaHoraInicio.setHours(res[0], res[1]);
      }
    });

    this.FormGroupHorario.get('HoraFinal').valueChanges.subscribe({
      next: () => {
        var res = this.FormGroupHorario.get('HoraFinal').value.split(':');
        this.fechaHoraFinal.setHours(res[0], res[1]);
      }
    });

    this.FormGroupHorario.valueChanges.subscribe({
      next: () => {
        this.validar();
      }
    });
  }

  convertir( hora: string): string {
    const a = hora.split(' ');
    const h = a[0].split(':'); 

    if( a[1] === 'PM' && h[0] === '12'){
      return hora;
    }else {
      const horas = Number(h[0]) + 12; 
      return horas + ':' + h[1] + ' PM';
    }
  }

  guardar(): void {
    if(this.validar()){
      if( this.nuevaSeccionHorario.id !== undefined){
        this.fechaHoraInicio.setMinutes( this.fechaHoraInicio.getMinutes() - this.offset);
        this.fechaHoraFinal.setMinutes( this.fechaHoraFinal.getMinutes() - this.offset);

        this.nuevaSeccionHorario.horaInicio = this.fechaHoraInicio;
        this.nuevaSeccionHorario.horaFinal = this.fechaHoraFinal;
        this.nuevaSeccionHorario.descripcion = this.FormGroupHorario.get('Descripcion').value;
        this.nuevaSeccionHorario.estado = this.FormGroupHorario.get('Estado').value;

      }else {

        this.fechaHoraInicio.setMinutes( this.fechaHoraInicio.getMinutes() - this.offset);
        this.fechaHoraFinal.setMinutes( this.fechaHoraFinal.getMinutes() - this.offset);

        this.nuevaSeccionHorario.id = 0;
        this.nuevaSeccionHorario.idEmpleado = this.data.idEmpleado;
        this.nuevaSeccionHorario.horaInicio = this.fechaHoraInicio;
        this.nuevaSeccionHorario.horaFinal = this.fechaHoraFinal;
        this.nuevaSeccionHorario.diaSemana = this.data.diaSemana;
        this.nuevaSeccionHorario.descripcion = this.FormGroupHorario.get('Descripcion').value;
        this.nuevaSeccionHorario.estado = this.FormGroupHorario.get('Estado').value;
     }

      this.horarioEmpleadoService.guardar(this.nuevaSeccionHorario).subscribe({
        next: res => {
          this._snackBar.open('Se ha registrado la sección del horario', '', {
            duration: 2500,
          });
        },
        error: err => {
          this._snackBar.open('No se logro registrar la sección del horario', '', {
            duration: 2500,
          });
        }
      });
    }
  }

  llenarFormulario(): void {
    const hi = this.nuevaSeccionHorario.horaInicio.split(' ');
    this.fechaHoraInicio.setHours(hi[0].split(':')[0], hi[0].split(':')[1]);

    const hf = this.nuevaSeccionHorario.horaFinal.split(' ');
    this.fechaHoraFinal.setHours(hf[0].split(':')[0], hf[0].split(':')[1]);

    this.FormGroupHorario.get('HoraInicio').setValue(this.horaInicio.split(' ')[0]);
    this.FormGroupHorario.get('HoraFinal').setValue(this.horaFinal.split(' ')[0]);
    this.FormGroupHorario.get('Descripcion').setValue(this.nuevaSeccionHorario.descripcion);
    this.FormGroupHorario.get('Estado').setValue(this.nuevaSeccionHorario.estado);
  }

  validar(): boolean {
    if (this.FormGroupHorario && this.FormGroupHorario.valid && this.fechaHoraInicio.getTime() < this.fechaHoraFinal.getTime() ){
      this.valid = true;
     return true;
    } else {
      this.valid = false;
      return false;
    }
  }

  validarHoras(): boolean {
    if( this.fechaHoraInicio >= this.fechaHoraFinal ) {
      return false;
    }
    return true;
  }
}
