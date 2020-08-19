import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitaProducto } from '../_models/cita-producto';
import * as moment from 'moment';


@Component({
  selector: 'app-finalizar-cita-datos',
  templateUrl: './finalizar-cita-datos.component.html',
  styleUrls: ['./finalizar-cita-datos.component.css']
})
export class FinalizarCitaDatosComponent implements OnInit {

  @Input()
  cita: CitaProducto;

  formGroupDatos = new FormGroup({
    Fecha: new FormControl('', Validators.required),
    // Duracion: new FormControl(this, Validators.required),
    Tipo: new FormControl('', Validators.required),
    Cliente: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    this.llenarDatos();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.cita = changes.
  // }

  llenarDatos(): void {
    this.formGroupDatos.get('Fecha').setValue(moment(this.cita.horaFinal).format('YYYY-MM-DD'));
    this.formGroupDatos.get('Tipo').setValue(this.cita.tipo === 'P' ? 'Producto' : 'Servicio');
    this.formGroupDatos.get('Cliente').setValue(this.cita.idCliente);
  }
}
