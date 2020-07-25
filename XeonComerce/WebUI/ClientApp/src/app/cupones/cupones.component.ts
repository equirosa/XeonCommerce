import { Component, OnInit, ViewChild } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { CuponService } from '../_services/cupon.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Cupon } from '../_models/cupon';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css']
})
export class CuponesComponent implements OnInit {

  cupones: Cupon[];
  cuponCrear: Cupon;
  displayColumns: string[] = ['id', 'idComercio', 'fechaExpiracion', 'valor']
  datos;

  constructor(public dialog: MatDialog, private cuponService: CuponService, private mensajeService: MensajeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getCupones();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }

  crear(): void {
    const dialogRef = this.dialog.open(DialogCupon, {
      width: '500px',
      data: {
        accion: "crear",
        permitir: !true,
        id: "",
        idComercio: "",
        fechaExpiracion: "",
        valor: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let cuponFinal: Cupon;
        cuponFinal = {
          "id": result.id,
          "idComercio": result.idComercio,
          "fechaExpiracion": result.fechaExpiracion,
          "valor": result.valor
        }
        this.cuponService.create(cuponFinal)
          .subscribe(() => {
            this.getCupones()
          });
      } else {
        console.log("Error al crear el cupon");
      }
    });
  }

  editar(cupon: Cupon): void {
    const dialogRef = this.dialog.open(DialogCupon, {
      width: '500px',
      data: {
        accion: "editar",
        permitir: !false,
        id: cupon.id,
        idComercio: cupon.idComercio,
        fechaExpiracion: cupon.fechaExpiracion,
        valor: cupon.valor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cuponService.update(result)
          .subscribe(() => this.getCupones());
      }
    });
  }

  getCupones(): void {
    this.cuponService.get()
      .subscribe(cupones => {
        this.cupones = cupones.sort((a, b) => {
          return a.id.localeCompare(b.id);
        });
        this.cupones = cupones.filter((a) => a.estado == 'A');
        this.datos = new MatTableDataSource(this.cupones);
        this.datos.sort = this.sort;
      });
  }

  delete(cupon: Cupon): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está a punto de eliminar un cupon"
      }
    });

    dialogRef.afterClose().subscribe(dialogResult => {
      if (dialogResult) this.cuponService.delete(cupon)
        .subscribe(() => this.getCupones());
    });
  }

}

@Component({
  selector: 'dialog-cupon',
  templateUrl: 'editar.html',
})

export class DialogCupon {

  constructor(
    public dialogRef: MatDialogRef<DialogCupon>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
