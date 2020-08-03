import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicio } from '../_models/servicio';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ServiciosService } from './../_services/servicios.service';
import { MatTableDataSource } from '@angular/material/table';
import { ComercioService } from '../_services/comercio.service';
import { Comercio } from '../_models/comercio';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicio: Servicio;
  servicios: Servicio[];
  comercios: Comercio[];
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'descuento', 'idComercio', 'duracion', 'editar', 'eliminar'];
  dataSource;
  public httpClient: HttpClient;
  public baseUrlApi: string;
  private servService: ServiciosService;
  public message: string;
  public serviceEndPoint: string;

  constructor(public dialog: MatDialog, http: HttpClient, servService: ServiciosService, private comercioService: ComercioService) {
    this.httpClient = http;
    this.servService = servService;

  }



  ngOnInit(): void {
    this.getServicios();
    this.getComercios();
  }

  getServicios(): void {
    this.servService.getServicio()
      .subscribe(servicio => {
        this.dataSource = new MatTableDataSource(servicio);
      });
  }

  getComercios(): void {
    this.comercioService.get()
      .subscribe(comercios => {
        this.comercios = comercios;
        console.log(this.comercios);
      });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogServicio, {
      width: '500px',
      data: {
        id: 0,
        tipo: 2,
        nombre: "",
        precio: "",
        descuento: 0,
        comercios: this.comercios,
        comercio: "",
        duracion: "",
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);
      console.log('The dialog was closed');
      if (result) {
        let comercio: Comercio;
        comercio = result.comercio;
        let servicio: Servicio;
        servicio = {
          "id": result.id,
          "tipo": result.tipo,
          "nombre": result.nombre,
          "precio": result.precio,
          "descuento": result.descuento,
          "idComercio": comercio.cedJuridica,
          "duracion": result.duracion
        }
        console.log(servicio);
        this.servService.postServicio(servicio)
          .subscribe(() => {
            this.getServicios()
          });
        window.location.reload();
      }
    });
  }

  eliminar(servicio: Servicio): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar un servicio. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) this.servService.delete(servicio)
        .subscribe(() => {
          this.getServicios();
        });
      this.getServicios();
    });
  }


  editarDialog(servicio: Servicio): void {
    function checkComercio() {
      return servicio.idComercio;
    }

    let comercioDelServicio = this.comercios.find(checkComercio);

    console.log(comercioDelServicio);

    const dialogRef = this.dialog.open(DialogEditarServicio, {
      width: '500px',
      data: {
        id: servicio.id,
        tipo: 2,
        nombre: servicio.nombre,
        precio: servicio.precio,
        descuento: 0,
        comercio: comercioDelServicio.nombreComercial,
        duracion: servicio.duracion
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);
      if (result) {
        servicio = {
          "id": servicio.id,
          "tipo": 2,
          "nombre": result.nombre,
          "precio": result.precio,
          "descuento": result.descuento,
          "idComercio": servicio.idComercio,
          "duracion": result.duracion
        }

        console.log(servicio);

        this.servService.putServicio(servicio)
          .subscribe(() => {
            this.getServicios()
          });
        this.getServicios();
      }

    });
  }
}


@Component({
  selector: 'dialog-producto',
  templateUrl: './crear-servicio.html',
})
export class DialogServicio {

  constructor(
    public dialogRef: MatDialogRef<DialogServicio>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comercioService: ComercioService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-editar-servicio',
  templateUrl: './editar-servicio.html',
})
export class DialogEditarServicio {

  constructor(
    public dialogRef: MatDialogRef<DialogEditarServicio>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comercioService: ComercioService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

