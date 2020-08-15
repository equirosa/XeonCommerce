import { Producto } from './../../_models/producto';
import { Carrito } from './../../_models/carrito';
import { ListaDeseos } from './../../_models/listaDeseos';
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
import { ListaDeseosService } from '../../_services/lista-deseos.service'
import { Direccion } from '../../_models/Direccion';
import { Ubicacion } from '../../_models/ubicacion';
import { MensajeService } from '../../_services/mensaje.service';


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
  listaDeseos: ListaDeseos[];
  user: User;
  constructor(
    private route: ActivatedRoute,
    private surcursalService: SucursalService,
    private productoService: ProductoService,
    private direccionService: DireccionService,
    private ubicacionService: UbicacionService,
    private carritoService: CarritoService,
    private ltsDeseosService: ListaDeseosService,
    private mensajeService: MensajeService,
    private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
    });
  }

  ngOnInit(): void {
    this.idSucursal = this.route.snapshot.params['id'];
    this.cargarSucursal();
    this.getListaDeseos();

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
        this.productos = res.filter(p => p.idComercio === this.sucursal.idComercio);
      },
      error: err => console.log(err)
    });
  }

  // llamar cuando al direccio de sucursal este implementado
  cargarDireccion(): void {
    this.getProvincias();
    this.direccionService.getBy(this.sucursal.idDireccion).subscribe({
      next: res => {
        if (res != null) {
          this.direccion = res;
          this.direccion.longitud = Number(this.direccion.longitud);
          this.direccion.latitud = Number(this.direccion.latitud);
          this.getCantonesE();
          this.getDistritosE();
        }
      },
      error: err => console.log(err)
    });
  }

  getProvincias(): void {
    this.ubicacionService.getProvincias()
      .subscribe(provincias => this.provincias = Object.keys(provincias).map(key => ({ value: Number(key), nombre: provincias[key] })));
  }


  getCantonesE(): void {
    let provincia = this.direccion.provincia;
    this.ubicacionService.getCantones(provincia)
      .subscribe(cantones => this.cantones = Object.keys(cantones).map(key => ({ value: Number(key), nombre: cantones[key] })));
  }


  getDistritosE(): void {
    let canton = this.direccion.canton;
    this.ubicacionService.getDistritos(this.direccion.provincia, canton)
      .subscribe(distritos => this.distritos = Object.keys(distritos).map(key => ({ value: Number(key), nombre: distritos[key] })));
  }

  agregarCarrito(producto: Producto) {
    let car: Carrito;
    car = {
      cantidad: 1,
      idUsuario: this.user.id,
      idProducto: producto.id
    }
    this.carritoService.create(car).subscribe();
  }

  agregarListaDeseos(producto: Producto) {
    this.getListaDeseos();
    let ltsDeseos: ListaDeseos;
    ltsDeseos = {
      idUsuario: this.user.id,
      idProducto: producto.id,
      cantidad: 1,
      idComercio: producto.idComercio
    }
    if (!this.verificarCantidadDeProductos(producto.cantidad)) {
      this.mensajeService.add("¡Este producto no esta disponible, no se puede agregar a lista de Deseos!");
      return;
    } else if (this.verificarSiProductoExiste(producto.id)){
      this.mensajeService.add("¡Este producto ya a sido agregado a su lista de Deseos!");
      return;
    } else {
      this.ltsDeseosService.create(ltsDeseos).subscribe();
      producto.cantidad = producto.cantidad - 1;
      this.productoService.putProductoSilencioso(producto).subscribe();
    }
  }

  verificarCantidadDeProductos(cantidadProductos: number): Boolean {
    let existeProducto = true;
    if (cantidadProductos <= 0) {
      existeProducto = false;
    }
    return existeProducto;
  }

  verificarSiProductoExiste(idProducto: number): Boolean {
    this.getListaDeseos();
    let prodExiste = false;
    for (var i = 0; i < this.listaDeseos.length; i++) {
      if (this.listaDeseos[i].idProducto == idProducto) {
        prodExiste = true;
        break;
      }
    }
    return prodExiste;
  }

  getListaDeseos(): void {
    this.ltsDeseosService.get(this.user.id)
      .subscribe(ltsDeseos => {
        this.listaDeseos= ltsDeseos;
        console.log(this.listaDeseos);
      });
  }

}
