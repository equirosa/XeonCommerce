import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { PromocionService } from '../_services/promocion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Promocion } from '../_models/productoServicio';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styleUrls: ['./descuentos.component.css']
})
export class DescuentosComponent implements OnInit {

  promociones = new MatTableDataSource<Promocion>();
  promocionCrear: Promocion;
  displayColumns: string[] = ['id', 'tipo', 'nombre', 'precio', 'cantidad', 'descuento', 'idComercio', 'duracion']
  datos;

  constructor(public dialog: MatDialog, private promocionService: PromocionService, private mensajeService: MensajeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getPromociones();
  }

  filtrar(value: string) {
    this.datos.filter = value.trim().toLowerCase();
  }

  editar(promo: Promocion): void {
    const dialogRef = this.dialog.open(DialogPromocion, {
      width: '500px',
      data: {
        accion: "editar",
        permitir: !true,
        id: promo.id,
        tipo: promo.tipo,
        nombre: promo.nombre,
        precio: promo.precio,
        cantidad: promo.cantidad,
        descuento: "",
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
      .subscribe({
        next: res => {
          this.promociones.data = res;
        },
        error: err => console.log(err)
      });
  }

  delete(promo: Promocion): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está a punto de eliminar una promocion"
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
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
