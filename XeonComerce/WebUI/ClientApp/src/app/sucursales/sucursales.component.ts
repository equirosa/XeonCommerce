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

  sucursales: Sucursal[];
  sucursal: Sucursal;
  displayedColumns: string[] = ['id', 'idDireccion', 'idComercio', 'disposiciones'];
  datos;
  provincias: Ubicacion[];
  cantones: Ubicacion[];
  distritos: Ubicacion[];
  direccion: Direccion;

  constructor(public dialog: MatDialog, private sucursalService: SucursalService, private direccionService: DireccionService,
    private mensajeService: MensajeService, private ubicacionService: UbicacionService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit(): void {
    this.getSucursales();
    this.getProvincias();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase;
  }

  getProvincias(): void {
    this.ubicacionService.getProvincias().subscribe(provincias =>
      this.provincias = Object.keys(provincias).map(key => ({ value: Number(key), nombre: provincias[key] })));
  }

  getSucursales(): void {
    this.sucursalService.get().subscribe(sucursales => {
      this.sucursales = sucursales.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      this.sucursales = sucursales.filter((a) => a.estado == 'A');
      this.datos = new MatTableDataSource(this.sucursales);
      this.datos.sort = this.sort;
    });
  }

  crear(): void {
    const dialogRef = this.dialog.open(DialogSucursal, {
      width: '500px',
      data: {
        accion: 'crear',
        permitir: true,
        id: "",
        idComercio: "",
        provincias: this.provincias,
        cantones: this.cantones,
        distritos: this.distritos,
        provincia: "",
        canton: "",
        distrito: "",
        sennas: "",
        disposiciones: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.direccion = {
          id: -1,
          provincia: result.provincia,
          canton: result.canton,
          distrito: result.distrito,
          sennas: result.sennas,
          latitud: result.lat,
          longitud: result.long,
        }

        let direccionFinal: Direccion
        this.direccionService.create(this.direccion).subscribe(() => {
          this.direccionService.get().subscribe(dirs => {
            dirs = dirs.filter((a) => {
              return (a.provincia == this.direccion.provincia && a.canton == this.direccion.canton && a.distrito == this.direccion.distrito &&
                a.latitud == this.direccion.latitud && a.longitud == this.direccion.longitud && a.sennas == this.direccion.sennas);
            });
            direccionFinal = dirs[0];
            if (direccionFinal) {
              let sucursalFinal: Sucursal;
              sucursalFinal = {
                "id": result.id,
                "idDireccion": direccionFinal.id,
                "idComercio": result.idComercio,
                "disposiciones": result.disposiciones,
                "estado": result.estado
              }
              this.sucursalService.create(sucursalFinal).subscribe(() => {
                this.provincias = [];
                this.cantones = [];
                this.distritos = [];
                this.direccion = undefined;
                this.getProvincias;
                this.getSucursales;
              });
            } else {
              console.log("Falló la búsqueda de ID de dirección...");
            }
          });
        });
      }
    });
  }

}

@Component({
  selector: 'dialog-sucursal',
  templateUrl: 'editar.html'
})

export class DialogSucursal {
  constructor(public dialogRef: MatDialogRef<DialogSucursal>,
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
    public dialogRef: MatDialogRef<DialogSucursal>,
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
