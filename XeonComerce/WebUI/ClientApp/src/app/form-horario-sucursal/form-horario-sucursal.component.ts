import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sucursal } from '../_models/sucursal';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HorarioSucursal } from '../_models/horario-sucursal';
import { HorarioSucursalService } from '../_services/horario-sucursal.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-form-horario-sucursal',
  templateUrl: './form-horario-sucursal.component.html',
  styleUrls: ['./form-horario-sucursal.component.css']
})
export class FormHorarioSucursalComponent implements OnInit {


  sucursal: Sucursal;
  horarioSucursal: HorarioSucursal[];
  nuevoHorario = new HorarioSucursal();

  horaInicio = new Date(1900, 0, 1);
  horaFinal = new Date(1900, 0, 1);
  offset = this.horaInicio.getTimezoneOffset();

  FormHorario = new FormGroup({
    Dia: new FormControl('', Validators.required),
    HoraInicio: new FormControl('', Validators.required),
    HoraFinal: new FormControl('', Validators.required)
  });

  dias = [
    {valor: 2, nombre: 'Lunes'},
    {valor: 3, nombre: 'Martes'},
    {valor: 4, nombre: 'Miércoles'},
    {valor: 5, nombre: 'Jueves'},
    {valor: 6, nombre: 'Viernes'},
    {valor: 7, nombre: 'Sabado'},
    {valor: 1, nombre: 'Domingo'}
  ];

  horario = new MatTableDataSource<HorarioSucursal>();
  columnas: string[] = ['dia', 'horaInicio', 'horaFinal', 'eliminar'];

  constructor( 
    public dialogRef: MatDialogRef<FormHorarioSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private horarioSucursalService: HorarioSucursalService) { }
  ngOnInit(): void {
    this.sucursal = this.data.sucursal;
    this.cargarHorario();

    this.FormHorario.get('Dia').valueChanges.subscribe({
      next: () => {
        const res = this.FormHorario.get('Dia').value;
        this.llenarDatos(res);
      }

    });
    }

  verificarHorario(dia: number): HorarioSucursal[] {
    return this.horarioSucursal.filter( h => h.diaSemana === dia);
  }

  llenarDatos(dia: number): void {
    const horario = this.verificarHorario(dia);
    if( horario.length === 1 && horario[0] ){
      this.nuevoHorario = horario[0];
      this.FormHorario.get('HoraInicio').setValue(this.convertir(horario[0].horaInicio));
      this.FormHorario.get('HoraFinal').setValue(this.convertir(horario[0].horaFinal));
    } else {
      this.nuevoHorario = new HorarioSucursal();
      this.FormHorario.get('HoraInicio').setValue('');
      this.FormHorario.get('HoraFinal').setValue('');
    }
  }

  guardarHorario(): void {

    const inicio = this.FormHorario.get('HoraInicio').value.split(':');
    this.horaInicio.setHours(inicio[0], inicio[1]);
    this.horaInicio.setMinutes( this.horaInicio.getMinutes() - this.offset);
  
    const fin = this.FormHorario.get('HoraFinal').value.split(':');
    this.horaFinal.setHours(fin[0], fin[1]);
    this.horaFinal.setMinutes( this.horaFinal.getMinutes() - this.offset);

    if ( this.FormHorario.valid && this.horaInicio.getTime() < this.horaFinal.getTime() ){


      if ( this.nuevoHorario.id === undefined){
        this.nuevoHorario.id = 0;
        this.nuevoHorario.idSucursal = this.sucursal.id;
      }

      this.nuevoHorario.horaInicio = this.horaInicio;
      this.nuevoHorario.horaFinal = this.horaFinal;
      this.nuevoHorario.diaSemana = this.FormHorario.get('Dia').value;

      this.horarioSucursalService.guardar(this.nuevoHorario).subscribe({
        next: res => {
          this.cargarHorario();
          this._snackBar.open('Se ha registrado el horario', '', {
            duration: 2500
          });
        },
        error: err => {
          this._snackBar.open(err, '', {
            duration: 2500
          });
        }
      });
    } else if( this.nuevoHorario.id && this.FormHorario.get('HoraInicio').value === '' && this.FormHorario.get('HoraFinal').value === ''){
      console.log(this.nuevoHorario);

    } else {
      this._snackBar.open('Hay un error con las horas ingresadas', '', {
        duration: 2500,
      });
    }
    this.horaInicio = new Date(1900, 0, 1);
    this.horaFinal = new Date(1900, 0, 1);
  }


  cargarHorario(): void {
    this.horarioSucursalService.get().subscribe({
      next: res => {
        if(res){
          this.horarioSucursal = res.filter( h => h.idSucursal === this.sucursal.id);
          this.horario.data = res;
          this.formatearHoras();
        }
      },
      error: err => console.log(err)
    });
  }

  convertir(hora): string {
    return moment( hora).format('HH:mm');
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


  eliminar(element): void {
    this.horarioSucursalService.delete(element).subscribe({
      next: res => {
        this.cargarHorario();
        this._snackBar.open('Se ha eliminado el horario ', '', {
          duration: 2500,
        });
      }, error: err => {
        this._snackBar.open('No se ha logrado eliminar el horario ', '', {
          duration: 2500,
        });
      }
    });
  }
}
