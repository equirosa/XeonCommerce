import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalificacionService } from '../_services/calificacion.service';
//import { MatDialogRef } from '@angular/material';
import { Calificacion } from '../_models/Calificacion';

@Component({
  selector: 'app-calificacion-dialog',
  templateUrl: './calificacion-dialog.component.html',
  styleUrls: ['./calificacion-dialog.component.css']
})
export class CalificacionDialogComponent implements OnInit {

  calificacion: Calificacion;
  valorCalificacion: string;
  errorMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private calificacionService: CalificacionService) { }

  ngOnInit(): void {
    this.calificacion = new Calificacion();
  }

  calificarClick(calificacion: number): void {
    this.valorCalificacion = calificacion.toString();
    this.calificacion.calificacion = calificacion;
  }

  guardarCalificacion(): void {
    this.calificacion.idProducto = this.data.idProducto;
    this.calificacion.idUsuario = this.data.idUsuario;
    console.log(this.calificacion);
    this.calificacionService.guardarCalificacion(this.calificacion).subscribe(() => {
      this.ngOnInit();
    });
  }
}
