import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaService } from '../_services/cita.service';
import { Producto } from '../_models/producto';
import { Sucursal } from '../_models/sucursal';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CitaProducto } from '../_models/cita-producto';

@Component({
  selector: 'app-form-cita-servicio',
  templateUrl: './form-cita-servicio.component.html',
  styleUrls: ['./form-cita-servicio.component.css']
})
export class FormCitaServicioComponent implements OnInit {

  user: any;
  servicio: Producto;
  sucursal: Sucursal;
  nuevaCita = new CitaProducto;

  formGroupCitaServicio = new FormGroup({
    Fecha: new FormControl('', Validators.required),
    Hora: new FormControl('', Validators.required),
    Servicio: new FormControl('', Validators.required),
    Precio: new FormControl('', Validators.required)
  });

  constructor( public dialogRef: MatDialogRef<FormCitaServicioComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private _snackBar: MatSnackBar, 
               private citaService: CitaService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.servicio = this.data.servicio;
    this.sucursal = this.data.sucursal;
    this.llenarDatos();
  }

  llenarDatos(): void{
    this.formGroupCitaServicio.get('Servicio').setValue(this.servicio.nombre);
    this.formGroupCitaServicio.get('Precio').setValue( '₡' + this.servicio.precio);
  }

  agendarCita(): void {
    if( this.formGroupCitaServicio.valid ){
      
      const fecha = new Date(this.formGroupCitaServicio.get('Fecha').value);
      const fechaFin = new Date(this.formGroupCitaServicio.get('Fecha').value);


      const offset = fecha.getTimezoneOffset();

      fecha.setMinutes(offset);
      fechaFin.setMinutes(offset);

      let horaInicio = this.convertir(this.formGroupCitaServicio.get('Hora').value);
      let h = horaInicio.split(':');
      fecha.setHours( Number(h[0]), Number(h[1]));
      fechaFin.setHours( Number(h[0]), Number( h[1]));

      fecha.setMinutes(fecha.getMinutes() - offset);
      fechaFin.setMinutes( fecha.getMinutes() - offset + this.servicio.duracion);

      let productos: Producto[] = [ this.servicio];

      this.nuevaCita.id = 0;
      this.nuevaCita.horaInicio = fecha;
      this.nuevaCita.horaFinal = fechaFin;
      this.nuevaCita.estado = 'P';
      this.nuevaCita.tipo = 'S';
      this.nuevaCita.idEmpleado = 0;
      this.nuevaCita.idFactura = 0;
      this.nuevaCita.idCliente = this.user.id;
      this.nuevaCita.idSucursal = this.sucursal.id;
      this.nuevaCita.idComercio = this.sucursal.idComercio;
      this.nuevaCita.productos = productos;

      this.citaService.create(this.nuevaCita).subscribe({
        next: res => {
          this._snackBar.open('Se ha agendado la cita', '', {duration: 2500});
        },
        error: err => {
          this._snackBar.open(err, '', {duration: 2500});
        }
      });

    }
    
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
