import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicio } from '../_models/servicio';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ServiciosService } from './../_services/servicios.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicio: Servicio;
  servicios: Servicio[];
  displayedColumns: string[] = ['nombre', 'precio', 'descuento', 'idComercio', 'duracion', 'editar', 'eliminar'];
  dataSource;
  public httpClient: HttpClient;
  public baseUrlApi: string;
  private servService: ServiciosService;
  public message: string;
  public serviceEndPoint: string;

  constructor(public dialog: MatDialog, http: HttpClient, servService: ServiciosService) {
    this.httpClient = http;
    this.servService = servService;

  }



  ngOnInit(): void {
    this.getServicios();
  }

  getServicios(): void {
    this.servService.getServicio()
      .subscribe(servicio => {
        this.dataSource = new MatTableDataSource(servicio);
      });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogServicio, {
      width: '500px',
      data: {
        id: 0,
        tipo: 1,
        nombre: "",
        precio: "",
        descuento: 0,
        idComercio: "",
        duracion: "",
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);
      console.log('The dialog was closed');
      if (result) {
        let servicio: Servicio;
        servicio = {
          "id": result.id,
          "tipo": result.tipo,
          "nombre": result.nombre,
          "precio": result.precio,
          "descuento": result.descuento,
          "idComercio": result.idComercio,
          "duracion": result.duracion
        }
        console.log(servicio);
        this.servService.postServicio(servicio)
          .subscribe(() => {
            this.getServicios()
          });
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
    @Inject(MAT_DIALOG_DATA) public data: Servicio) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
