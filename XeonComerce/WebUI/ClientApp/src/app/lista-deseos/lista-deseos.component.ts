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
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})
export class ListaDeseosComponent implements OnInit {

  impuestos: Impuesto[];
  user: User;
  productos: any[];
  productosPP: any[];
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'eliminar'];
  datos;

  constructor(
    private productoService: ProductoService,
    private ltsDeseosService: ListaDeseosService,
    private mensajeService: MensajeService,
    private impuestoService: ImpuestoService,
    public dialog: MatDialog,
    private accountService: AccountService
  ) {
    this.accountService.user.subscribe(x => {
      this.user = x;
    });
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getProductos();
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

          console.log(this.productos);
          this.datos = new MatTableDataSource(this.productos);
          this.datos.sort = this.sort;
          this.productosPP = this.productos;
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

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar un producto de la lista de deseos. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log(this.user.id);
        console.log(element.id);
        element.cantidad = element.cantidad + 1;
        this.productoService.putProductoSilencioso(element.cantidad).subscribe();
        this.ltsDeseosService.delete(this.user.id, element.id).subscribe(() => {
          this.getProductos();
        });
      }
    });

  }

  limpiar() {

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

      }
    });

  }


}
