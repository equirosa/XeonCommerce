import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Bitacora } from "./../_models/bitacora";
import { BitacoraService } from "./../_services/bitacora.service";
import { Impuesto } from "./../_models/impuesto";
import { User } from "@app/_models";
import { AccountService } from "@app/_services";
import { ImpuestoService } from "./../_services/impuesto.service";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Servicio } from "../_models/servicio";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { ServiciosService } from "./../_services/servicios.service";
import { MatTableDataSource } from "@angular/material/table";
import { ComercioService } from "../_services/comercio.service";
import { MensajeService } from "../_services/mensaje.service";
import { Comercio } from "../_models/comercio";
import { ConfirmDialogComponent } from "./../_components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-servicio",
  templateUrl: "./servicio.component.html",
  styleUrls: ["./servicio.component.css"],
})
export class ServicioComponent implements OnInit {
  servicio: Servicio;
  servicios: Servicio[];
  comercios: Comercio[];
  displayedColumns: string[] = [
    "id",
    "nombre",
    "precio",
    "descuento",
    "idComercio",
    "duracion",
    "editar",
    "eliminar",
  ];
  dataSource;
  public httpClient: HttpClient;
  public baseUrlApi: string;
  private servService: ServiciosService;
  public message: string;
  public serviceEndPoint: string;
  user: any;
  impuestos: Impuesto[];

  constructor(
    public dialog: MatDialog,
    http: HttpClient,
    servService: ServiciosService,
    private comercioService: ComercioService,
    private impuestoService: ImpuestoService,
    private mensajeService: MensajeService,
    private bitacoraService: BitacoraService,
    private accountService: AccountService
  ) {
    this.accountService.user.subscribe((x) => {
      this.user = x;
    });
    this.httpClient = http;
    this.servService = servService;
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getImpuestos();
    this.getServicios();
    this.getComercios();
  }

  getServicios(): void {
    this.servService.getServicio().subscribe((servicio) => {
      if (this.user.comercio) {
        this.dataSource = new MatTableDataSource(
          servicio.filter((i) => i.idComercio == this.user.comercio.cedJuridica)
        );
      } else if (this.user.empleado) {
        this.dataSource = new MatTableDataSource(
          servicio.filter((i) => i.idComercio == this.user.empleado.idComercio)
        );
      } else {
        this.dataSource = new MatTableDataSource(servicio);
      }

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getComercios(): void {
    this.comercioService.get().subscribe((comercios) => {
      if (this.user.comercio) {
        this.comercios = [
          comercios.find(
            (i) => i.cedJuridica == this.user.comercio.cedJuridica
          ),
        ];
      } else if (this.user.empleado) {
        this.comercios = [
          comercios.find((i) => i.cedJuridica == this.user.empleado.idComercio),
        ];
      } else {
        this.comercios = comercios;
      }
      console.log(this.comercios);
    });
  }

  getImpuestos(): void {
    this.impuestoService.getImpuesto().subscribe((impuestos) => {
      this.impuestos = impuestos;
      console.log(this.impuestos);
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  formularioCompleto(serv) {
    let formularioCompleto = true;
    if (
      serv.nombre == "" ||
      serv.precio == "" ||
      serv.impuesto == "" ||
      serv.comercio == "" ||
      serv.duracion == ""
    ) {
      formularioCompleto = false;
    }
    return formularioCompleto;
  }

  datosCorrectosValoresPositivos(serv) {
    let datosCorrectos = true;
    if (parseInt(serv.precio) < 1 || parseInt(serv.duracion) < 1) {
      datosCorrectos = false;
    }
    return datosCorrectos;
  }

  validarNombre(serv) {
    if (serv.nombre.length < 3) {
      return false;
    }
    return true;
  }

  openDialog(): void {
    let idComercio = "",
      esAdmin = false;

    if (this.user.tipo != "A") {
      if (this.user.tipo == "C") {
        idComercio = this.user.comercio.cedJuridica;
      } else if (this.user.tipo == "E") {
        idComercio = this.user.empleado.idComercio;
      }
    } else {
      esAdmin = true;
    }
    const dialogRef = this.dialog.open(DialogServicio, {
      width: "500px",
      data: {
        id: 0,
        tipo: 2,
        noEsAdmin: !esAdmin,
        nombre: "",
        precio: "",
        descuento: 0,
        comercios: this.comercios,
        comercio: idComercio,
        duracion: "",
        impuestos: this.impuestos,
        impuesto: "",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Resultado: ${result}`);

      if (result) {

      if (!this.formularioCompleto(result)) {
        this.mensajeService.add("¡Favor llene todos los datos!");
        return;
      }

      if (!this.datosCorrectosValoresPositivos(result)) {
        this.mensajeService.add(
          "¡Favor cerciorarse, que los valores ingresados no sean negativos!"
        );
        return;
      }

      if (!this.validarNombre(result)) {
        this.mensajeService.add(
          "¡El nombre del servicio debe contener más de 3 letras!"
        );
        return;
      }

        let servicio: Servicio;
        servicio = {
          id: result.id,
          tipo: result.tipo,
          nombre: result.nombre,
          precio: result.precio,
          descuento: result.descuento,
          idComercio: result.comercio,
          duracion: result.duracion,
          impuesto: result.impuesto.id,
        };
        console.log(servicio);
        this.servService.postServicio(servicio).subscribe(() => {
          this.getServicios();
          if (this.user.tipo == "A") {
            var log: Bitacora;
            log = {
              idUsuario: this.user.id,
              accion: "Creación de servicio",
              detalle: `Se creó un servicio para (${result.comercio}) ${result.nombre}`,
              id: -1,
              fecha: new Date(),
            };
            this.bitacoraService.create(log).subscribe();
          }
        });
        this.getServicios();
      }
    });
  }

  eliminar(servicio: Servicio): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar un servicio. ",
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult)
        this.servService.delete(servicio).subscribe(() => {
          this.getServicios();
          if (this.user.tipo == "A") {
            var log: Bitacora;
            log = {
              idUsuario: this.user.id,
              accion: "Eliminación de servicio",
              detalle: `Se eliminó un servicio para (${servicio.idComercio}) ${servicio.nombre}`,
              id: -1,
              fecha: new Date(),
            };
            this.bitacoraService.create(log).subscribe();
          }
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
      width: "500px",
      data: {
        id: servicio.id,
        tipo: 2,
        nombre: servicio.nombre,
        precio: servicio.precio,
        impuestos: this.impuestos,
        impuesto: servicio.impuesto,
        descuento: servicio.descuento,
        comercio: comercioDelServicio.nombreComercial,
        duracion: servicio.duracion,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Resultado: ${result}`);

      if (result) {
		  
      if (!this.formularioCompleto(result)) {
        this.mensajeService.add("¡Favor llene todos los datos!");
        return;
      }

      if (!this.datosCorrectosValoresPositivos(result)) {
        this.mensajeService.add(
          "¡Favor cerciorarse, que los valores ingresados no sean negativos!"
        );
        return;
      }

      if (!this.validarNombre(result)) {
        this.mensajeService.add(
          "¡El nombre del servicio debe contener más de 3 letras!"
        );
        return;
      }
        servicio = {
          id: servicio.id,
          tipo: 2,
          nombre: result.nombre,
          precio: result.precio,
          descuento: result.descuento,
          idComercio: servicio.idComercio,
          duracion: result.duracion,
          impuesto: result.impuesto,
        };

        console.log(servicio);

        this.servService.putServicio(servicio).subscribe(() => {
          this.getServicios();
          if (this.user.tipo == "A") {
            var log: Bitacora;
            log = {
              idUsuario: this.user.id,
              accion: "Actualización de servicio",
              detalle: `Se actualizó un servicio para (${servicio.idComercio}) ${servicio.nombre}`,
              id: -1,
              fecha: new Date(),
            };
            this.bitacoraService.create(log).subscribe();
          }
        });
        this.getServicios();
      }
    });
  }
}

@Component({
  selector: "dialog-producto",
  templateUrl: "./crear-servicio.html",
})
export class DialogServicio {
  constructor(
    public dialogRef: MatDialogRef<DialogServicio>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comercioService: ComercioService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "dialog-editar-servicio",
  templateUrl: "./editar-servicio.html",
})
export class DialogEditarServicio {
  constructor(
    public dialogRef: MatDialogRef<DialogEditarServicio>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comercioService: ComercioService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
