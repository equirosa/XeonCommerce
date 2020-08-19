import { Producto } from './../../_models/producto';
import { Carrito } from './../../_models/carrito';
import { ListaDeseos } from './../../_models/listaDeseos';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { CarritoService } from './../../_services/carrito.service';
import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../_services/sucursal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sucursal } from '../../_models/sucursal';
import { ProductoService } from '../../_services/producto.service';
import { DireccionService } from '../../_services/direccion.service';
import { UbicacionService } from '../../_services/ubicacion.service';
import { ListaDeseosService } from '../../_services/lista-deseos.service'
import { Direccion } from '../../_models/Direccion';
import { Ubicacion } from '../../_models/ubicacion';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoCitaComponent } from '../../_components/producto-cita/producto-cita.component';
import { FormCitaProductoComponent } from '../../form-cita-producto/form-cita-producto.component';
import { MensajeService } from '../../_services/mensaje.service';
import { TransaccionFinancieraService } from '../../_services/transaccionFinanciera.service';
import { TransaccionFinanciera } from '../../_models/transaccionFinanciera';
import { FacturaDetalleService } from '../../_services/facturaDetalle.service';
import { FacturaDetalle } from '../../_models/facturaDetalle';
import { FacturaMaestro } from '../../_models/facturaMaestro';
import { FacturaMaestroService } from '../../_services/facturaMaestro.service';
import { ServiciosService } from '../../_services/servicios.service';
import { Servicio } from '../../_models/servicio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormCitaServicioComponent } from '../../form-cita-servicio/form-cita-servicio.component';


@Component({
  selector: 'app-sucursal',
  templateUrl: './perfil-sucursal.component.html',
  styleUrls: ['./perfil-sucursal.component.css']
})
export class PerfilSucursalComponent implements OnInit {

  
  idSucursal: string;
  sucursal: Sucursal;
  productos: Producto[];
  clienteBloqueado: boolean = false;
  direccion: Direccion;
  transaccionesPendientes: TransaccionFinanciera[];
  facturasConMulta: FacturaDetalle[];
  facturasMaestro: FacturaMaestro[];
  servicios: Servicio[];
  provincias: Ubicacion[];
	cantones: Ubicacion[];
	distritos: Ubicacion[];
  user: User;
  listaDeseos: ListaDeseos[];


  productosCita: Producto[] = [];

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private surcursalService: SucursalService,
    private productoService: ProductoService,
    private servicioService: ServiciosService,
    private direccionService: DireccionService,
    private ubicacionService: UbicacionService,
    private carritoService: CarritoService,
    private ltsDeseosService: ListaDeseosService,
    private mensajeService: MensajeService,
    private facturaMaestroService: FacturaMaestroService, 
    private facturaDetalleService: FacturaDetalleService,
    private transaccionFinancieraService: TransaccionFinancieraService,
    private accountService: AccountService,
    private _snackBar: MatSnackBar ) {
    this.accountService.user.subscribe(x => {
      this.user = x;
    });
  }

  ngOnInit(): void {
    this.obtenerFacturasConMulta();
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
        this.cargarServicios();
      },
      error: err => console.log(err)
    });
  }

  cargarProductos(): void {
    this.productoService.getProducto().subscribe({
      next: res => {
        this.productos = res.filter(p => p.idComercio === this.sucursal.idComercio);
      },
      error: err => {
        this._snackBar.open(err, '', {
          duration: 2500
        });
      }
    });
  }

  cargarServicios(): void {
    this.servicioService.getServicio().subscribe({
      next: res => {
        this.servicios = res.filter( s => s.idComercio === this.sucursal.idComercio);
      },
      error: err => {
        this._snackBar.open(err, '', {
          duration: 2500
        });
      }
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
    if (this.clienteBloqueado) {
      this.router.navigate(['historial']);
      this.mensajeService.add("¡Multa Pendiente!");
      return;
    } else {

      let car: Carrito;
      car = {
        cantidad: 1,
        idUsuario: this.user.id,
        idProducto: producto.id
      }
      this.carritoService.create(car).subscribe();
    }
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

    dialogRef.afterClosed().subscribe(dialogResult => {
     
      const productoCita = producto;
      productoCita.cantidad = dialogResult;
      this.productosCita.push(productoCita);
  obtenerFacturasConMulta(): void {
    this.facturaDetalleService.get().subscribe((detalles) => {
      this.facturasConMulta = detalles.filter((i) => i.idProducto == 97);
      this.obtenerFacturasMaestroConMulta(this.facturasConMulta);
    });
  }

  obtenerFacturasMaestroConMulta(facDetalle: FacturaDetalle[]): void {
    let facturasMulta: FacturaMaestro[];
    this.facturaMaestroService.get().subscribe((facMaestro) => {
      facturasMulta = new Array(facMaestro.length);
      for (var i = 0; i < facDetalle.length; i++) {
        for (var j = 0; j < facMaestro.length; j++) {
          if (facDetalle[i].idFactura == facMaestro[j].idFactura && facMaestro[j].idCliente == this.user.id) {
            facturasMulta[i] = facMaestro[j];
          }
        }
      }
      this.obtenerEstadoFacturaCliente(facturasMulta);
    });
  }

  obtenerEstadoFacturaCliente(facturasConMulta : FacturaMaestro[]): void {
    this.transaccionFinancieraService.get().subscribe((transaccionFinanciera) => {
      this.transaccionesPendientes = transaccionFinanciera.filter((i) => i.estado == "P");
        this.bloquearCliente(facturasConMulta, this.transaccionesPendientes);
    });
  }

  contratar(servicio: Producto): void {
    const dialogRef = this.dialog.open(FormCitaServicioComponent, {
      width: '400px',
      height: '500px',
      data: { servicio, sucursal: this.sucursal}
    });
  

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.productosCita = [];
      this.cargarServicios();
    });
    if (this.clienteBloqueado) {
      this.router.navigate(['historial']);
      this.mensajeService.add("¡Multa Pendiente!");
      return;
    } else {
      const dialoRef = this.dialog.open(FormCitaServicioComponent, {
        width: '400px',
        height: '500px',
        data: { servicio, sucursal: this.sucursal }
      });
    }
  
  }

  bloquearCliente(facturasConMulta: FacturaMaestro[], tranPendiente : TransaccionFinanciera[]): void {
    for (var i = 0; i < facturasConMulta.length; i++) {
      for (var j = 0; j < tranPendiente.length; j++) {
        if (facturasConMulta[i].idTransaccion == tranPendiente[j].id) {
          this.clienteBloqueado = true;
        }
      }
    }
    console.log(this.clienteBloqueado);
  }

}
