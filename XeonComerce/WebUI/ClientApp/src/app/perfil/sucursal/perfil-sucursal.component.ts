import { Producto } from './../../_models/producto';
import { Carrito } from './../../_models/carrito';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { CarritoService } from './../../_services/carrito.service';
import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../_services/sucursal.service';
import { ActivatedRoute } from '@angular/router';
import { Sucursal } from '../../_models/sucursal';
import { ProductoService } from '../../_services/producto.service';
import { DireccionService } from '../../_services/direccion.service';
import { UbicacionService } from '../../_services/ubicacion.service';
import { Direccion } from '../../_models/Direccion';
import { Ubicacion } from '../../_models/ubicacion';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoCitaComponent } from '../../_components/producto-cita/producto-cita.component';
import { FormCitaProductoComponent } from '../../form-cita-producto/form-cita-producto.component';


@Component({
  selector: 'app-sucursal',
  templateUrl: './perfil-sucursal.component.html',
  styleUrls: ['./perfil-sucursal.component.css']
})
export class PerfilSucursalComponent implements OnInit {

  //'1234567-1';
  idSucursal: string;
  sucursal: Sucursal;
  productos: Producto[];
  direccion: Direccion; 
  provincias: Ubicacion[];
	cantones: Ubicacion[];
	distritos: Ubicacion[];
  user: User;

  productosCita: Producto[] = [];

  constructor( 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private surcursalService: SucursalService,
    private productoService: ProductoService,
    private direccionService: DireccionService,
    private ubicacionService: UbicacionService,
    private carritoService: CarritoService,
    private accountService: AccountService,) {
    this.accountService.user.subscribe(x => {
      this.user = x;
		});
	 }

  ngOnInit(): void {
    this.idSucursal = this.route.snapshot.params['id'];
    this.cargarSucursal();
    
  }



  cargarSucursal(): void {
    this.surcursalService.getBy(this.idSucursal).subscribe({
      next: res => {
        this.sucursal = res;
        this.cargarDireccion();
        this.cargarProductos();
      },
      error: err => console.log(err)
    });
  }

  cargarProductos(): void {
    this.productoService.getProducto().subscribe({
      next: res => {
        this.productos = res.filter( p => p.idComercio === this.sucursal.idComercio);
      },
      error: err => console.log(err)
    });
  }

  // llamar cuando al direccio de sucursal este implementado
  cargarDireccion(): void {
    this.getProvincias();
    this.direccionService.getBy(this.sucursal.idDireccion).subscribe({
      next: res => {
        if(res!=null){
          this.direccion = res;
          this.direccion.longitud = Number(this.direccion.longitud);
          this.direccion.latitud = Number(this.direccion.latitud);
        }
      },
      error: err => console.log(err)
    });
  }

  getProvincias(): void {
    this.ubicacionService.getProvincias()
    .subscribe(provincias => this.provincias = Object.keys(provincias).map(key => ({value: Number(key), nombre: provincias[key]})));
    }
  
    
    getCantonesE(): void {
    let provincia = this.direccion.provincia;
    this.ubicacionService.getCantones(provincia)
    .subscribe(cantones => this.cantones = Object.keys(cantones).map(key => ({value: Number(key), nombre: cantones[key]})));
    }
  
  
  getDistritosE(): void {
    let canton = this.direccion.canton;
    this.ubicacionService.getDistritos(this.direccion.provincia, canton)
    .subscribe(distritos => this.distritos = Object.keys(distritos).map(key => ({value: Number(key), nombre: distritos[key]})));
	}
	
	agregarCarrito(producto: Producto){
		let car: Carrito;
		car = {
			cantidad: 1,
			idUsuario: this.user.id,
			idProducto: producto.id
		}
		this.carritoService.create(car).subscribe();
  }

  agregarProductoCita(producto: Producto): void{
    const dialogRef = this.dialog.open(ProductoCitaComponent, {
      width: '300px',
      height: '200px',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('Producto', producto);
      console.log('Cantidad', dialogResult);
      const productoCita = producto;
      productoCita.cantidad = dialogResult;
      this.productosCita.push(productoCita);
    });
  }

  agendarCita(): void {
    const dialogRef = this.dialog.open(FormCitaProductoComponent, {
      width: '400px',
      height: '500px',
      data: { productos: this.productosCita}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.productosCita = [];
      this.cargarProductos();
    });
  }
}
