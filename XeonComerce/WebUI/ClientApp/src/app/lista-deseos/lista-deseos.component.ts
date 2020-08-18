import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { Producto } from '../_models/producto';
import { Impuesto } from '../_models/impuesto';
import { MensajeService } from '../_services/mensaje.service';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { ListaDeseos } from '../_models/listaDeseos';
import { ProductoService } from './../_services/producto.service';
import { ListaDeseosService } from './../_services/lista-deseos.service'
import { ComercioService } from '../_services/comercio.service';
import { ImpuestoService } from './../_services/impuesto.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Carrito } from '../_models/carrito';
import { TransaccionFinancieraService } from './../_services/transaccionFinanciera.service';
import { TransaccionFinanciera } from './../_models/transaccionFinanciera';
import { FacturaDetalleService } from './../_services/facturaDetalle.service';
import { FacturaDetalle } from './../_models/facturaDetalle';
import { FacturaMaestro } from './../_models/facturaMaestro';
import { FacturaMaestroService } from './../_services/facturaMaestro.service';
import { CarritoService } from './../_services/carrito.service';


@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})
export class ListaDeseosComponent implements OnInit {

  clienteBloqueado: boolean = false;

  transaccionesPendientes: TransaccionFinanciera[];
  facturasConMulta: FacturaDetalle[];
  facturasMaestro: FacturaMaestro[];
  impuestos: Impuesto[];
  productosTotales: Producto[];
  ltsDeseos: ListaDeseos[];
  deseo: ListaDeseos;
  user: User;
  productos: any[];
  productosPP: any[];
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'carrito', 'eliminar'];
  datos;

  constructor(
    private productoService: ProductoService,
    private ltsDeseosService: ListaDeseosService,
    private mensajeService: MensajeService,
    private impuestoService: ImpuestoService,
    private carritoService: CarritoService,
    public dialog: MatDialog,
    private router: Router,
    private facturaMaestroService: FacturaMaestroService,
    private facturaDetalleService: FacturaDetalleService,
    private transaccionFinancieraService: TransaccionFinancieraService,
    private accountService: AccountService
  ) {
    this.accountService.user.subscribe(x => {
      this.user = x;
    });
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.obtenerFacturasConMulta();
    this.getProductos();
    this.getAllProductos();
  }


  getImpuestos(): void {
    this.impuestoService.getImpuesto().subscribe((impuestos) => this.impuestos = impuestos);
  }

  getProductos(): void {

    this.ltsDeseosService.get(this.user.id).subscribe((items) => {

      this.productoService.getProducto()
        .subscribe(productos => {
          this.productos = productos.filter(a => items.find((i) => i.idProducto == a.id));
          for (var i = 0; i < this.productos.length; i++) {
            for (var j = 0; j < items.length; j++) {
              if (this.productos[i].id == items[j].idProducto) {
                this.productos[i].cantidad = items[j].cantidad;
                break;
              }
            }
          }
          this.datos = new MatTableDataSource(this.productos);
          this.datos.sort = this.sort;
        })

    });
  }

  getAllProductos(): void {

    this.ltsDeseosService.get(this.user.id).subscribe((items) => {
      this.productoService.getProducto()
        .subscribe(productos => {
          this.productosTotales = productos.filter(a => items.find((i) => i.idProducto == a.id));
        })
    });
  }

  calcularDescuento(element) {
    return this.decimales(Number(100 - (element.precio - element.descuento) / (element.precio) * 100));
  }

  decimales(a) {
    return Math.round(a) == a ? a : a.toFixed(2);
  }

  calcularPrecio(element) {
    return element.descuento ? element.precio - element.descuento : element.precio;
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }

  eliminar(element) {
    this.getAllProductos();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar un producto de la lista de deseos. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        let producto = element;
        console.log(producto);
        for (var i = 0; i < this.productosTotales.length; i++) {
          if (producto.id == this.productosTotales[i].id) {
            producto.cantidad = this.productosTotales[i].cantidad + producto.cantidad;
          }
        }
        this.productoService.putProductoSilencioso(producto).subscribe();
        this.ltsDeseosService.delete(this.user.id, element.id).subscribe(() => {
          this.getProductos();
        });
      }
    });

  }

  limpiar() {
    this.getProductos();
    this.getAllProductos();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de vaciar su lista de deseos. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {

        this.ltsDeseosService.deleteAll(this.user.id).subscribe(() => {
          this.getProductos();
        });

        for (var i = 0; i < this.productosTotales.length; i++) {
          for (var j = 0; j < this.productosTotales.length; j++) {
            if (this.productosTotales[i].id == this.productos[j].id) {
              console.log(this.productosTotales[i]);
              this.productosTotales[i].cantidad = this.productosTotales[i].cantidad + this.productos[j].cantidad;
              console.log(this.productosTotales[i]);
              this.productoService.putProductoSilencioso(this.productosTotales[i]).subscribe(() => {
              });
              break;
            }
          }
        }

      }
    });
  }

  anadirProducto(element) {
    this.ltsDeseosService.get(this.user.id)
      .subscribe(ltsDeseos => {
        this.ltsDeseos = ltsDeseos;
        for (var i = 0; i < this.ltsDeseos.length; i++) {
          if (element.id == this.ltsDeseos[i].idProducto) {
            this.ltsDeseos[i].cantidad = this.ltsDeseos[i].cantidad + 1;
            this.ltsDeseosService.update(this.ltsDeseos[i]).subscribe(() => {
              this.getProductos();
            });
          }
        }
      });
    this.getAllProductos();

    for (var i = 0; i < this.productosTotales.length; i++) {
      if (element.id == this.productosTotales[i].id) {
        element.cantidad = this.productosTotales[i].cantidad - 1;
      }
    }

    this.productoService.putProductoSilencioso(element).subscribe(() => {
    });
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

  obtenerEstadoFacturaCliente(facturasConMulta: FacturaMaestro[]): void {
    this.transaccionFinancieraService.get().subscribe((transaccionFinanciera) => {
      this.transaccionesPendientes = transaccionFinanciera.filter((i) => i.estado == "P");
      this.bloquearCliente(facturasConMulta, this.transaccionesPendientes);
    });
  }

  bloquearCliente(facturasConMulta: FacturaMaestro[], tranPendiente: TransaccionFinanciera[]): void {
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
