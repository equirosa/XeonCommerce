import { Component, OnInit, Inject } from '@angular/core';
import { CitaProducto } from '../_models/cita-producto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ProductoService } from '../_services/producto.service';
import { Producto } from '../_models/producto';
import { CitaService } from '../_services/cita.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-finalizar-cita-empleado',
  templateUrl: './finalizar-cita-empleado.component.html',
  styleUrls: ['./finalizar-cita-empleado.component.css']
})
export class FinalizarCitaEmpleadoComponent implements OnInit {

  cita: CitaProducto;
  estado: string ;
  valid = true;
 

  estados = [
    {valor: 'A', nombre: 'Ausente'},
    {valor: 'F', nombre: 'Finalizada'}
  ];


  constructor(
    public dialogRef: MatDialogRef<FinalizarCitaEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private citaService: CitaService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.cita = this.data.cita;
  }

  finalizar(): void {

    const horaInicio = new Date(this.cita.horaFinal);
    const offset = horaInicio.getTimezoneOffset();

    horaInicio.setMinutes(offset);
    
    let duracion = 0;
      for ( let p of this.cita.productos){
        duracion =+ p.duracion;
      }

    horaInicio.setMinutes(-1 * duracion - offset);

    this.cita.horaInicio = horaInicio;
    this.cita.estado = this.estado; 

    this.citaService.finalizar(this.cita).subscribe({
      next: res => {
        this._snackBar.open('Se ha finalizado al cita', '', {
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

  selectEstado(estadoCita: string): void {
    if ( estadoCita ) { this.estado = estadoCita; }
  }

  recibirProductos(form: FormArray): void{
    for(let f of form.controls){
      this.cita.productos = this.cita.productos.map( p => {
        if (p.id === f.value.Id){
          p.cantidad = f.value.Cantidad;
        }
        return p;
      });
    }
   }



}
