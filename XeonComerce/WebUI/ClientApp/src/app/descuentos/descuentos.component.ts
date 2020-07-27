import { Component, OnInit, ViewChild } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { PromocionService } from '../_services/promocion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { productoServicio, ProductoServicio } from '../_models/productoServicio';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styleUrls: ['./descuentos.component.css']
})
export class DescuentosComponent implements OnInit {

  promociones: ProductoServicio[];
  promocionCrear: ProductoServicio;
  displayColumns: string[] = ['id', 'tipo', 'nombre', 'precio', 'cantidad', 'descuento', 'idComercio', 'duracion']
  datos;

  constructor(public dialog: MatDialog, private promocionService: PromocionService, private mensajeService: MensajeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getPromociones();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }

  editar(promo: ProductoServicio): void {
    const dialogRef = this.dialog.open(DialogPromocion, {
      width: '500px',
      data: {
        accion: "editar",
        permitir: !false,
        id: promo.id,
        tipo: promo.tipo,
        nombre: promo.nombre,
        precio: promo.precio,
        cantidad: promo.cantidad,
        descuento: promo.descuento,
        idComercio: promo.idComercio,
        duracion: promo.duracion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.promocionService.update(result)
          .subscribe(() => this.getPromociones());
      }
    });
  }

  getPromociones(): void {
    this.promocionService.get()
      .subscribe(promociones => {
        this.promociones = promociones.sort((a, b) => {
          return a.nombre.localeCompare(b.nombre);
        });
        this.promociones = promociones.filter((a) => a.estado == 'A');
        this.datos = new MatTableDataSource(this.promociones);
        this.datos.sort = this.sort;
      });
  }

  delete(promo: ProductoServicio): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está a punto de eliminar una promocion"
      }
    });

    dialogRef.afterClose().subscribe(dialogResult => {
      if (dialogResult) this.promocionService.delete(promo)
        .subscribe(() => this.getPromociones());
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
