import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../../../_services/empleado.service';
import { FormEmpleadoComponent } from '../../components/form-empleado/form-empleado.component';
import { SucursalService } from '../../../_services/sucursal.service';
import { Sucursal } from '../../../_models/sucursal';
import { ComercioService } from '../../../_services/comercio.service';


@Component({
  selector: 'app-empleado-comercio',
  templateUrl: './empleado-comercio.component.html',
  styleUrls: ['./empleado-comercio.component.css']
})
export class EmpleadoComercioComponent implements OnInit {

  actualizarDatos = false;
  sucursales: Sucursal[];
  idComercio: string;
  idSucursal: string;

  constructor( 
    public dialog: MatDialog, 
    private empleadoService: EmpleadoService, 
    private sucursalService: SucursalService, 
    private comercioService: ComercioService ) { 
     
      this.idComercio = JSON.parse(localStorage.getItem('user')).comercio.cedJuridica;
      this.cargarSucursales();
    }

  ngOnInit(): void {
  }


  seleccionSucursal(sucursal): void {
    this.idSucursal = sucursal;
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormEmpleadoComponent, {
      width: '750px',
      height: '400px',
      data: { idComercio: this.idComercio, idSucursal: this.idSucursal }
    });

    dialogRef.afterClosed().subscribe( result => {
      this.actualizarDatos = true;
    });
  }

  cargarSucursales(): void {
    this.sucursalService.get().subscribe({
      next: res => {
        this.sucursales = res.filter( s => s.idComercio === this.idComercio);
      },
      error: err => console.log(err)
    });
  }


  // buscarComercio(): void {    
  //   this.comercioService.get().subscribe({
  //     next: res => {
  //       var comercio = res.filter( c => c.idUsuario === JSON.parse(localStorage.getItem('user')).id );
  //       this.idComercio = comercio[0].cedJuridica;
  //     }, 
  //     error: err => console.log(err)
  //   });

  // }

}
