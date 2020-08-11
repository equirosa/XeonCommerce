import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { Comercio } from '../_models/comercio'
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
// import { MouseEvent } from '@agm/core';
import { ComercioService } from '../_services/comercio.service'
@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  user: any;
  sucursales: Sucursal[];
  sucursalCrear: Sucursal;
  displayedColumns: string[] = ['id', 'idComercio', 'nombre', 'idDireccion', 'disposiciones', 'editar', 'eliminar'];
  datos;
  provincias: Ubicacion[];
  cantones: Ubicacion[];
  distritos: Ubicacion[];
  direccion: Direccion;
  // longitud: number = -83.7534;
  // latitud: number = 9.7489;
  marker: marker;
  comercios: Comercio[];
  comercio: Comercio;

  constructor(private comercioService: ComercioService, private accountService: AccountService, public dialog: MatDialog,
    private archivoService: ArchivoService, private sucursalService: SucursalService, private direccionService: DireccionService,
    private mensajeService: MensajeService, private ubicacionService: UbicacionService) { this.user = this.accountService.userValue; }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getComercios();
    this.getSucursales();
    this.getProvincias();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }

  getComercios(): void {
    this.comercioService.get().subscribe(comercios => {
      this.comercios = comercios.sort((a, b) => {
        return a.cedJuridica.localeCompare(b.cedJuridica);
	  });
	  
	  let idComercio = "";

		if(this.user.tipo == 'C'){
			idComercio = this.user.comercio.cedJuridica;
		}else if(this.user.tipo == 'E'){
			idComercio = this.user.empleado.idComercio;
		}

	  if (this.user.tipo != 'A') {
		this.comercios = this.comercios.filter((a) => a.cedJuridica == idComercio)
	  }
    })
  }



  getProvincias(): void {
    this.ubicacionService.getProvincias()
      .subscribe(provincias => {
        this.provincias = Object.keys(provincias).map(key => ({ value: Number(key), nombre: provincias[key] }))
      });
  }


  abrirCrear(): void {

	let idComercio = "", esAdmin = false;
	
	if (this.user.tipo != 'A') {
		if(this.user.tipo == 'C'){
			idComercio = this.user.comercio.cedJuridica;
		}else if(this.user.tipo == 'E'){
			idComercio = this.user.empleado.idComercio;
		}
	}else{
		esAdmin = true;
	}


    this.ubicacionService.getProvincias()
      .subscribe(provincias => {
        this.provincias = Object.keys(provincias).map(key => ({ value: Number(key), nombre: provincias[key] }))
        const dialogRef = this.dialog.open(DialogSucursal, {
          width: '500px',
          data: {
            accion: "crear",
            noEsAdmin: !esAdmin,
            permitir: true,
            id: "",
            idComercio: idComercio,
            disposiciones: "",
            idUsuario: this.user.id,
            estado: "A",
            nombre: "",
            provincias: this.provincias,
            cantones: this.cantones,
            distritos: this.distritos,
            comercios: this.comercios,
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
              longitud: result.longitud.toString()
            }

            let direccionFinal: Direccion
            this.direccionService.create(this.direccion).subscribe(() => {
              this.direccionService.get()
                .subscribe(dirs => {
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
                      "disposiciones": result.disposiciones,
                      "idDireccion": direccionFinal.id,
                      "nombre": result.nombre,
                      "estado": result.estado
                    }
                    this.sucursalService.create(sucursalFinal)
                      .subscribe(() => {
                        let comFinal: Sucursal;
                        this.sucursalService.get()
                          .subscribe(sucursales => {
                            sucursales = sucursales.filter((a) => {
                              return (a.id == sucursalFinal.id /*&& a.idUsuario == this.user.id*/);
                            });
                            comFinal = sucursales[0];
                            if (comFinal) {
                              console.log(`Resultado: ${result}`);
                              this.mensajeService.add("Se creó la solicitud de sucursal");
                            }
                          });
                        this.getSucursales();
                      });
                  }
                });
            });
          }
        });
      });
  }

  abrirEditar(sucursal: Sucursal): void {
	let esAdmin = false;
	
	if (this.user.tipo == 'A') {
		esAdmin = true;
	}
    const dialogRef = this.dialog.open(DialogSucursal, {
      width: '500px',
      data: {
        accion: "editar",
		noEsAdmin: !esAdmin,
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
		comercios: this.comercios,
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
          return a.id.localeCompare(b.id);
        });
		this.sucursales = sucursales.filter((a) => a.estado == 'A');
		
		let idComercio = "";

		if(this.user.tipo == 'C'){
			idComercio = this.user.comercio.cedJuridica;
		}else if(this.user.tipo == 'E'){
			idComercio = this.user.empleado.idComercio;
		}
        if (this.user.tipo != 'A') {
          this.sucursales = sucursales.filter((a) => a.idComercio == idComercio)
        }
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
    private ubicacionService: UbicacionService,
    private comercioService: ComercioService) { }

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

  getComercios(): void {
    console.log("Obteniendo comercios...");
    let comercios: Comercio[];
    this.comercioService.get().subscribe(comercios => this.data.comercios);
  }

  markerDragEnd($event: any) {
    this.data.latitud = $event.latLng.lat()
    this.data.longitud = $event.latLng.lng()
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

interface marker {
  lat: number;
  lng: number;
}
