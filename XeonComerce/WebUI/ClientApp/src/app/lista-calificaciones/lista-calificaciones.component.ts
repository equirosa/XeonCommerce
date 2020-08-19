import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CalificacionService } from './../_services/calificacion.service';
import { Producto } from '../_models/producto';
import { MensajeService } from '../_services/mensaje.service';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { ProductoService } from './../_services/producto.service';
import { ComercioService } from '../_services/comercio.service';
import { MatDialog } from '@angular/material/dialog';
import { Calificacion } from '../_models/Calificacion';
import { InformeCalificacion } from '../_models/InformeCalificacion';
import { Comercio } from '../_models/comercio';

@Component({
  selector: 'app-lista-calificaciones',
  templateUrl: './lista-calificaciones.component.html',
  styleUrls: ['./lista-calificaciones.component.css']
})
export class ListaCalificacionesComponent implements OnInit {

  datosCalificaciones: any[];
  calificacion: InformeCalificacion;
  displayedColumns: string[] = ['id', 'producto', 'comercio', 'calificacion', 'idUsuario', 'eliminar'];
  datos;

  constructor
    (
      private productoService: ProductoService,
      private comercioService: ComercioService,
      private calificacionService : CalificacionService,
      private mensajeService: MensajeService,
      public dialog: MatDialog,
    ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getCalificaciones();
  }

  getCalificaciones(): void {

    this.calificacionService.obtenerCalificaciones().subscribe((calificaciones) => {
      this.productoService.getProducto().subscribe(productos => {
        this.comercioService.get().subscribe(comercios => {
          let dtsCalificaciones = this.obtenerNombreDelProducto(this.datosCalificaciones, calificaciones, productos, comercios);
          console.log(dtsCalificaciones);
          this.datos = new MatTableDataSource(dtsCalificaciones);
          this.datos.sort = this.sort;
        })
      })
    });
  }

  obtenerNombreDelProducto(datosCalificaciones : any[] ,calificaciones: Calificacion [], productos : Producto[], comercios : Comercio[]): InformeCalificacion[] {
    datosCalificaciones = calificaciones;
    for (var i = 0; i < calificaciones.length; i++) {
      for (var j = 0; j < productos.length; j++) {
        if (calificaciones[i].idProducto == productos[j].id) {
          datosCalificaciones[i].producto = productos[j].nombre;
          datosCalificaciones[i].id = calificaciones[i].id;
          datosCalificaciones[i].calificacion = calificaciones[i].calificacion;
          datosCalificaciones[i].idUsuario = calificaciones[i].idUsuario;
          datosCalificaciones[i].comercio = this.obtenerNombreDelComercio(productos[j], comercios);
          console.log(datosCalificaciones);
        }
      }
    }
    return datosCalificaciones;
  }

  obtenerNombreDelComercio(producto: Producto, comercios: Comercio[]): string {
    let nombreComercio = "";
    for (var i = 0; i < comercios.length; i++) {
      if (producto.idComercio == comercios[i].cedJuridica) {
        nombreComercio = comercios[i].nombreComercial;
      }
    }
    return nombreComercio;
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }

  eliminar(calificacion: InformeCalificacion): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar una calificación. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(calificacion.id);
      if (dialogResult) this.calificacionService.eliminarCalificacion(calificacion.id)
        .subscribe(() => {
          this.getCalificaciones();
        });
      this.getCalificaciones();
    });
  }
}
