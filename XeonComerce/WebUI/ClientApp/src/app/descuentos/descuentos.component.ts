import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { ProductoService } from '../_services/producto.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Producto } from '../_models/producto';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { Comercio } from '../_models/comercio';
import { Impuesto } from '../_models/impuesto';
import { ComercioService } from '../_services/comercio.service';
import { ImpuestoService } from '../_services/impuesto.service';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styleUrls: ['./descuentos.component.css']
})
export class DescuentosComponent implements OnInit {

  producto: Producto[];
  comercios: Comercio[];
  impuestos: Impuesto[];
  promocionCrear: Producto;
  displayColumns: string[] = ['id', 'tipo', 'nombre', 'precio', 'cantidad', 'descuento', 'idComercio', 'duracion', 'editar', 'eliminar']
  datos;
  dataSource;

  constructor(public dialog: MatDialog, private productoService: ProductoService, private comercioService: ComercioService, private impuestoService: ImpuestoService, private mensajeService: MensajeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getProductos();
    this.getComercios();
    this.getImpuestos();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  editar(prod: Producto): void {
    const dialogRef = this.dialog.open(DialogPromocion, {
      width: '500px',
      data: {
        accion: "editar",
        permitir: !false,
        id: prod.id,
        tipo: 1,
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad: prod.cantidad,
        descuento: 0,
        idComercio: prod.idComercio,
        duracion: prod.duracion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.putProducto(result)
          .subscribe(() => this.getProductos());
      }
    });
  }

  getProductos(): void {
    this.productoService.getProducto()
      .subscribe(productos => {
        this.dataSource = new MatTableDataSource(productos);
      });
  }

  getComercios(): void {
    this.comercioService.get()
      .subscribe(comercios => {
        this.comercios = comercios;
        console.log(this.comercios);
      });
  }

  getImpuestos(): void {
    this.impuestoService.getImpuesto()
      .subscribe(impuestos => {
        this.impuestos = impuestos;
        console.log(this.impuestos);
      });
  }

  delete(promo: Producto): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está a punto de eliminar una promocion"
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) this.productoService.delete(promo)
        .subscribe(() => this.getProductos());
    });
  }
}

@Component({
  selector: 'dialog-promocion',
  templateUrl: 'editarPromo.html',
})

export class DialogPromocion {

  constructor(
    public dialogRef: MatDialogRef<DialogPromocion>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
