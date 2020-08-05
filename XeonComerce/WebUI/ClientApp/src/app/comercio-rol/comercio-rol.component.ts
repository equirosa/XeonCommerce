import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormRolComponent } from '../form-rol/form-rol.component';

@Component({
  selector: 'app-comercio-rol',
  templateUrl: './comercio-rol.component.html',
  styleUrls: ['./comercio-rol.component.css']
})
export class ComercioRolComponent implements OnInit {

  idComercio: string;

  actualizarDatos = false;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.idComercio = JSON.parse(localStorage.getItem('user')).comercio.cedJuridica;
   }

  ngOnInit(): void {
  }


  crearRol(): void {
    const dialogRef = this.dialog.open(FormRolComponent, {
      width: '400px',
      height: '500px',
      data: {tipo: 'registrar', idComercio: this.idComercio}
    });

    dialogRef.afterClosed().subscribe( result => {
      this.actualizarDatos = !this.actualizarDatos;
    });
  }
}
