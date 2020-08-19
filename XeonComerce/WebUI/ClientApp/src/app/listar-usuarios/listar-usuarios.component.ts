import { MatPaginator } from "@angular/material/paginator";
import { FormControl } from "@angular/forms";
import { ConfirmDialogComponent } from "./../_components/confirm-dialog/confirm-dialog.component";
import { filter } from "rxjs/operators";
import { Direccion } from "./../_models/direccion";
import { Ubicacion } from "./../_models/ubicacion";
import { Usuario } from "../_models/usuario";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { UsuarioService } from "../_services/usuario.service";
import { MensajeService } from "../_services/mensaje.service";
import { UbicacionService } from "../_services/ubicacion.service";
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { DireccionService } from "../_services/direccion.service";

interface SelectUsuario {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-listar-usuarios",
  templateUrl: "./listar-usuarios.component.html",
  styleUrls: ["./listar-usuarios.component.css"],
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: Usuario[];
  usuario: Usuario;
  usuariosCiente: Usuario[];
  UsuariosTodos: boolean = true;
  cliente: boolean = false;
  selectUsuario: SelectUsuario[] = [
    { value: 'U', viewValue: 'Clientes' },
    { value: 'todos', viewValue: 'Todos' }
  ];

  selectedValue: string;

  displayedColumnsCliente: string[] = [
    "id",
    "nombre",
    "apellidoUno",
    "apellidoDos",
    "genero",
    "fechaNacimiento",
    "correoElectronico",
    "numeroTelefono",
    "idDireccion",
    "estado",
    "codigo",
    "modificar",
    "eliminar",
    'desbloquear',
    "ver",
  ];
  dataSource;

  displayedColumns: string[] = [
    "id",
    "nombre",
    "apellidoUno",
    "apellidoDos",
    "genero",
    "fechaNacimiento",
    "correoElectronico",
    "numeroTelefono",
    "idDireccion",
    "estado",
    "codigo",
    "eliminar",
    'desbloquear',
    "ver",
  ];
  datos;
  provincias: Ubicacion[];
  cantones: Ubicacion[];
  distritos: Ubicacion[];
  direccion: Direccion;

  constructor(
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    private direccionService: DireccionService,
    private mensajeService: MensajeService,
    private ubicacionService: UbicacionService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getUsuarios();
    this.getProvincias();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }

  getProvincias(): void {
    this.ubicacionService
      .getProvincias()
      .subscribe(
        (provincias) =>
          (this.provincias = Object.keys(provincias).map((key) => ({
            value: Number(key),
            nombre: provincias[key],
          })))
      );
  }

  getUsuarios(): void {
    this.cliente = false;
    this.UsuariosTodos = true;
    this.usuarioService.get().subscribe((usuarios) => {
      this.usuarios = usuarios.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      this.usuarios = usuarios.filter((a) => a.estado == "A" || a.estado == "B");
      this.datos = new MatTableDataSource(this.usuarios);
      this.datos.sort = this.sort;
      this.datos.paginator = this.paginator;
    });
  }

  getUsuarioCliente(): void {
    this.cliente = true;
    this.UsuariosTodos = false;
    this.usuarioService.get().subscribe((usuarios) => {
      this.usuarios = usuarios.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      this.usuariosCiente = usuarios.filter((a) => a.estado == "A" && a.tipo == "U");
      this.dataSource = new MatTableDataSource(this.usuariosCiente);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(usuario: Usuario): void {
    usuario.estado = "I";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de deshabilitar un usuario. ",
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.usuarioService.update(usuario).subscribe(() => {
          this.getUsuarios();

          // var log: Bitacora;
          // log = {
          // 	idUsuario: this.user.id,
          // 	accion: "Intento de eliminación de usuario",
          // 	detalle: `Se intento eliminar de el usuario (${usuario.cedJuridica}) ${usuario.nombreComercial}`,
          // 	id: -1,
          // 	fecha: new Date()
          // }
          // this.bitacoraService.create(log).subscribe();
        });
      }
    });
  }


  desbloquear(usuario: Usuario): void {
    usuario.estado = "A";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de desbloquear un usuario. ",
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.usuarioService.desbloquear(usuario).subscribe(() => {
          this.getUsuarios();
        });
      }
    });
  }

  updateToAdmin(usuario: Usuario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de hacer administrador a un usuario. ",
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.usuarioService.updateToAdmin(usuario).subscribe(() => {
          this.getUsuarios();
        });
      }
    });
  }

  verDireccion(usuario: Usuario): void {
    this.direccionService.getBy(usuario.idDireccion).subscribe((dir) => {
      dir.latitud = Number(dir.latitud);
      dir.longitud = Number(dir.longitud);
      const dialogRef = this.dialog.open(DialogDireccionUsuario, {
        maxWidth: "500px",
        data: Object.assign(
          {
            provincias: "",
            cantones: "",
            distritos: "",
            permitir: !false,
          },
          dir
        ),
      });
    });
  }

  seleccionUsuario() {
    if (this.selectedValue == "U") {
      this.getUsuarioCliente();
    } else {
      this.getUsuarios();
    }
  }

  editar(element: Usuario): void {
    let dialogRef = this.dialog.open(EditarClienteComponent, {
      data:
      {
        id: element.id,
        nombre: element.nombre,
        apellidoUno: element.apellidoUno,
        apellidoDos: element.apellidoDos,
        genero: element.genero,
        fechaNacimiento: element.fechaNacimiento,
        correoElectronico: element.correoElectronico,
        numeroTelefono: element.numeroTelefono,
        idDireccion: element.idDireccion,
        estado: element.estado,
        codigo: element.codigo,
        tipo: "U"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsuarioCliente();
    });
    this.getUsuarioCliente();
  }
}

@Component({
  selector: "dialog-direccion",
  templateUrl: "direccion.html",
})
export class DialogDireccionUsuario implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDireccionUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ubicacionService: UbicacionService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getProvincias();
    this.getCantonesE({ value: this.data.provincia });
    this.getDistritosE({ value: this.data.canton });
  }

  getProvincias(): void {
    console.log("provincias");
    this.ubicacionService
      .getProvincias()
      .subscribe(
        (provincias) =>
          (this.data.provincias = Object.keys(provincias).map((key) => ({
            value: Number(key),
            nombre: provincias[key],
          })))
      );
  }

  getCantonesE(event: any): void {
    console.log("Recibido");
    let provincia = event.value;
    console.log(event.value);
    this.ubicacionService
      .getCantones(provincia)
      .subscribe(
        (cantones) =>
          (this.data.cantones = Object.keys(cantones).map((key) => ({
            value: Number(key),
            nombre: cantones[key],
          })))
      );
  }

  getDistritosE(event: any): void {
    console.log("Recibido");
    let canton = event.value;
    console.log(event.value);
    this.ubicacionService
      .getDistritos(this.data.provincia, canton)
      .subscribe(
        (distritos) =>
          (this.data.distritos = Object.keys(distritos).map((key) => ({
            value: Number(key),
            nombre: distritos[key],
          })))
      );
  }
}
