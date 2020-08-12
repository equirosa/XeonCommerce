import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../_models/producto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Cita } from '../_models/cita';
import * as moment from 'moment';

@Component({
  selector: 'app-form-cita-producto',
  templateUrl: './form-cita-producto.component.html',
  styleUrls: ['./form-cita-producto.component.css']
})
export class FormCitaProductoComponent implements OnInit {

  user: any;
  productos: Producto[];
  nuevaCita = new Cita();
  formGroupCitaProducto = new FormGroup({
    Fecha: new FormControl('', Validators.required),
    Hora: new FormControl('', Validators.required)
  });

  FormProductos = new FormArray([]);

  constructor( public dialogRef: MatDialogRef<FormCitaProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.productos = this.data.productos;
    console.log(this.productos);
    this.agregarForms();
  }

  agregarForms(): void {
    for ( let p of this.productos){
      const nuevoFormGroup = new FormGroup({
        Cantidad: new FormControl(p.cantidad, [Validators.required, Validators.min(0), Validators.max(p.cantidad)])
      });
      this.FormProductos.push(nuevoFormGroup);
    }
  }

  agendarCita(): void {
    
    if ( this.formGroupCitaProducto.valid && this.FormProductos.valid ){

      const fecha = new Date(this.formGroupCitaProducto.get('Fecha').value);
      const fechaFin = new Date(this.formGroupCitaProducto.get('Fecha').value);

      const offset = fecha.getTimezoneOffset();
      fecha.setMinutes(offset);
      fechaFin.setMinutes(offset);
     

      let horaInicio = this.convertir(this.formGroupCitaProducto.get('Hora').value);
      let h = horaInicio.split(':');
      fecha.setHours( Number(h[0]), Number(h[1]));
      fechaFin.setHours( Number(h[0]), Number( h[1]));

     // let horaFinal = fecha;
      let duracion = 0;
      for ( let p of this.productos){
        duracion =+ p.duracion;
      }
      //horaFinal.setMinutes(duracion);
      fechaFin.setMinutes(duracion);

      this.nuevaCita.id = 0;
      this.nuevaCita.horaInicio = fecha;
      this.nuevaCita.horaFinal = fechaFin;
      this.nuevaCita.estado = 'P';
      this.nuevaCita.tipo = 'P';
      this.nuevaCita.idEmpleado = 0;
      // this.nuevaCita.idFactura = 0; 
      this.nuevaCita.idCliente = this.user.id;

      
      console.log(this.nuevaCita);
    }

    this.dialogRef.close(true);

  }

  convertir(hora): string {
    const a = hora.split(' ');
    const h = a[0].split(':');

    if( a[1] === 'PM' && h[0] !== '12'){
      const horas = Number(h[0]) + 12;
      return horas + ':' + h[1];
    }else {
      return a[0];
    }
  }



}
