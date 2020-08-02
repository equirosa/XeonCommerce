import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { FormControl } from '@angular/forms';
import { ArchivoService } from './../_services/archivo.service';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs/operators';
import { Direccion } from './../_models/direccion';
import { Ubicacion } from './../_models/ubicacion';
import { Sucursal } from '../_models/sucursal';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SucursalService } from '../_services/sucursal.service';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DireccionService } from '../_services/direccion.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  user: User;
  sucursales: Sucursal[];
  sucursalCrear: Sucursal;
  displayedColumns: string[] = ['id', 'idComercio', 'nombre', 'idDireccion', 'disposiciones', 'editar', 'eliminar'];
  datos;
  provincias: Ubicacion[];
  cantones: Ubicacion[];
  distritos: Ubicacion[];
  direccion: Direccion;

  constructor(private accountService: AccountService, public dialog: MatDialog,
    private archivoService: ArchivoService, private sucursalService: SucursalService, private direccionService: DireccionService,
    private mensajeService: MensajeService, private ubicacionService: UbicacionService) { this.user = this.accountService.userValue; }

  categorias = new FormControl();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    this.getSucursales();
    this.getProvincias();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }



  getProvincias(): void {
    this.ubicacionService.getProvincias()
      .subscribe(provincias => this.provincias = Object.keys(provincias).map(key => ({ value: Number(key), nombre: provincias[key] })));
  }


  /*estaCompleto(a) {
    if (!a) return false;
    let obj = Object.keys(a);
    for (let i = 0; i < obj.length; i++) {
      if (obj[i] != "direccion" && (a[obj[i]] === "" || a[obj[i]] === " ")) return false;
    }
    return true;
  }*/

  abrirCrear(): void {

    const dialogRef = this.dialog.open(DialogSucursal, {
      width: '500px',
      data: {
        accion: "crear",
        permitir: true,
        id: "123",
        idComercio: "",
        nombre:"",
        idDireccion: "",
        disposiciones: "",
        estado: "A",
        provincias: this.provincias,
        cantones: this.cantones,
        distritos: this.distritos,
        provincia: "",
        canton: "",
        distrito: "",
        latitud: 9.7489,
        longitud: -83.7534,
        dir: true,
        sennas: ""
      }

    });



    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);

      /*if (!this.estaCompleto(result)) {
        this.mensajeService.add("Favor llene todos los datos");
        return;
      }*/
      if (result) {
        //Revisar si están los datos de dir y crearla retornar el id y ya.
        console.log("Primero se crea una dirección");

        this.direccion = {
          id: -1,
          provincia: result.provincia,
          canton: result.canton,
          distrito: result.distrito,
          sennas: result.sennas,
          latitud: result.latitud.toString(),
          longitud: result.longitud.toString(),
        }

        let direccionFinal: Direccion
        this.direccionService.create(this.direccion).subscribe(() => {
          this.direccionService.get().subscribe(dirs => {
            dirs = dirs.filter((a) => {
              return (a.provincia == this.direccion.provincia && a.canton == this.direccion.canton && a.distrito == this.direccion.distrito && a.latitud == this.direccion.latitud && a.longitud == this.direccion.longitud && a.sennas == this.direccion.sennas);
            });
            direccionFinal = dirs[0];
            if (direccionFinal) {
              console.log("Direccion a registrar es: ", this.direccion);
              let sucursalFinal: Sucursal;
              sucursalFinal = {
                "id": result.id,
                "idComercio": result.idComercio,
                "nombre": result.nombre,
                "idDireccion": direccionFinal.id,
                "disposiciones": result.disposiciones,
                "estado": result.estado
              }
              this.sucursalService.create(sucursalFinal)
                .subscribe(() => {


                  this.provincias = [];
                  this.cantones = [];
                  this.distritos = [];
                  this.direccion = undefined;
                  this.getProvincias();

                  this.getSucursales()
                });
            } else {
              console.log("Algo ocurrio al buscar el id de la direccion.");
            }
          });
        });
      }
    });
  }


  abrirEditar(sucursal: Sucursal): void {
    const dialogRef = this.dialog.open(DialogSucursal, {
      width: '500px',
      data: {
        accion: "editar",
        permitir: !false,
        id: sucursal.id,
        idComercio: sucursal.idComercio,
        nombre: sucursal.nombre,
        disposiciones: sucursal.disposiciones,
        idDireccion: sucursal.idDireccion,
        estado: sucursal.estado,
        provincias: this.provincias,
        cantones: this.cantones,
        distritos: this.distritos,
        provincia: "",
        canton: "",
        distrito: "",
        latitud: "",
        longitud: "",
        dir: false,
        sennas: ""
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);
      if (result) {
        this.sucursalService.update(result).subscribe(() => {
          this.getSucursales();
        });
      }
    });
  }


  getSucursales(): void {
    this.sucursalService.get()
      .subscribe(sucursales => {
        this.sucursales = sucursales.sort((a, b) => {
          return a.idComercio.localeCompare(b.idComercio);
        });
        this.sucursales = sucursales.filter((a) => a.estado == 'A');
        this.datos = new MatTableDataSource(this.sucursales);
        this.datos.sort = this.sort;
        this.datos.paginator = this.paginator;
      });
  }

  delete(sucursal: Sucursal): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar una sucursal. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.sucursalService.delete(sucursal).subscribe(() => {
          this.getSucursales();
        });
      }
    });
  }




  verDireccion(sucursal: Sucursal): void {
    this.direccionService.getBy(sucursal.idDireccion).subscribe((dir) => {
      dir.latitud = Number(dir.latitud);
      dir.longitud = Number(dir.longitud);
      const dialogRef = this.dialog.open(DialogDireccionSucursal, {
        maxWidth: "500px",
        data: Object.assign({
          provincias: "",
          cantones: "",
          distritos: "",
          permitir: !false
        }, dir)
      });
    });
  }
}


@Component({
  selector: 'dialog-sucursal',
  templateUrl: 'editar.html',
})
export class DialogSucursal {

  constructor(
    public dialogRef: MatDialogRef<DialogSucursal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ubicacionService: UbicacionService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getCantonesE(event: any): void {
    console.log("Recibido");
    let provincia = event.value;
    console.log(event.value)
    this.ubicacionService.getCantones(provincia)
      .subscribe(cantones => this.data.cantones = Object.keys(cantones).map(key => ({ value: Number(key), nombre: cantones[key] })));
  }


  getDistritosE(event: any): void {
    console.log("Recibido");
    let canton = event.value;
    console.log(event.value)
    this.ubicacionService.getDistritos(this.data.provincia, canton)
      .subscribe(distritos => this.data.distritos = Object.keys(distritos).map(key => ({ value: Number(key), nombre: distritos[key] })));
  }

}




@Component({
  selector: 'dialog-direccion',
  templateUrl: 'direccion.html',
})
export class DialogDireccionSucursal implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDireccionSucursal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ubicacionService: UbicacionService) { }

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
    this.ubicacionService.getProvincias()
      .subscribe(provincias => this.data.provincias = Object.keys(provincias).map(key => ({ value: Number(key), nombre: provincias[key] })));
  }

  getCantonesE(event: any): void {
    console.log("Recibido");
    let provincia = event.value;
    console.log(event.value)
    this.ubicacionService.getCantones(provincia)
      .subscribe(cantones => this.data.cantones = Object.keys(cantones).map(key => ({ value: Number(key), nombre: cantones[key] })));
  }

  getDistritosE(event: any): void {
    console.log("Recibido");
    let canton = event.value;
    console.log(event.value)
    this.ubicacionService.getDistritos(this.data.provincia, canton)
      .subscribe(distritos => this.data.distritos = Object.keys(distritos).map(key => ({ value: Number(key), nombre: distritos[key] })));
  }
}
