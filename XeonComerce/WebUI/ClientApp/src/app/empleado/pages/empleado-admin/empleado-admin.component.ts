import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormEmpleadoComponent } from '../../components/form-empleado/form-empleado.component';
import { EmpleadoService } from '../../../_services/empleado.service';
import { SucursalService } from '../../../_services/sucursal.service';
import { Sucursal } from '../../../_models/sucursal';
import { Comercio } from '../../../_models/comercio';
import { ComercioService } from '../../../_services/comercio.service';

@Component({
  selector: 'app-empleado-admin',
  templateUrl: './empleado-admin.component.html',
  styleUrls: ['./empleado-admin.component.css']
})
export class EmpleadoAdminComponent implements OnInit {

  actualizarDatos = false;
  sucursales: Sucursal[];
  comercios: Comercio[];
  idComercio: string;
  idSucursal: string;


  constructor( 
    public dialog: MatDialog, 
    private empleadoService: EmpleadoService, 
    private sucursalService: SucursalService, 
    private comercioService: ComercioService ) { }

  ngOnInit(): void {
    this.cargarComercios();
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormEmpleadoComponent, {
      width: '750px',
      height: '400px',
      data: { empleado: '1' }
    });

    dialogRef.afterClosed().subscribe( result => {
      this.actualizarDatos = true;
    });
  }

  selecionarComercio(comercio): void{
    this.idComercio = comercio;
    if(this.idSucursal) this.idSucursal = '';
    this.cargarSucursales();
  }

  selecionarSucursal(sucursal): void{
    this.idSucursal = sucursal;

  }

  cargarComercios(): void {
    this.comercioService.get().subscribe({
      next: res => {
        this.comercios = res;
      },
      error: err => console.log(err)
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
}
