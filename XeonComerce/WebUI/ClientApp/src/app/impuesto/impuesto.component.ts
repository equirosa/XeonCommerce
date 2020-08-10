import { Bitacora } from './../_models/bitacora';
import { User } from '@app/_models';
import { BitacoraService } from './../_services/bitacora.service';
import { AccountService } from '@app/_services';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Impuesto } from '../_models/impuesto';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ImpuestoService } from './../_services/impuesto.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { MensajeService } from '../_services/mensaje.service';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent implements OnInit {

  user: User;
  impuesto: Impuesto;
  impuestos: Impuesto[];
  displayedColumns: string[] = ['id', 'nombre', 'valor', 'editar', 'eliminar'];
  dataSource;

  public httpClient: HttpClient;
  public baseUrlApi: string;
  private impuestoService: ImpuestoService;
  public message: string;
  public serviceEndPoint: string;

  constructor(public dialog: MatDialog, http: HttpClient, impService: ImpuestoService, private mensajeService: MensajeService,
	private bitacoraService: BitacoraService, private accountService : AccountService) { 
	this.user = this.accountService.userValue; 
    this.httpClient = http;
    this.impuestoService = impService;
  }

  ngOnInit(): void {
    this.getImpuestos();
  }

  getImpuestos(): void {
    this.impuestoService.getImpuesto()
      .subscribe(impuestos => {
        this.dataSource = new MatTableDataSource(impuestos);
      });
  }

  formularioCompleto(prod) {
    let formularioCompleto = true;
    if (prod.nombre == "" || prod.valor == "") {
      formularioCompleto = false;
    }
    return formularioCompleto;
  }

  datosCorrectosValorPositivo(imp) {
    let datosCorrectos = true;
    if (parseInt(imp.valor) < 1) {
      datosCorrectos = false;
    }
    return datosCorrectos;
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  abrirCrear(): void {
    const dialogRef = this.dialog.open(DialogImpuesto, {
      width: '500px',
      data: {
        accion: "Crear",
        id: 0,
        nombre: "",
        valor: "",
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);

      if (!this.formularioCompleto(result)) {
        this.mensajeService.add("¡Favor llene todos los datos!");
        return;
      }

      if (!this.datosCorrectosValorPositivo(result)) {
        this.mensajeService.add("¡Favor cerciorarse, que el valor ingresados no sea negativo!");
        return;
      }

      if (result) {
        let impuesto: Impuesto;
        impuesto = {
          "id": result.id,
          "nombre": result.nombre,
          "valor": result.valor
        }
        console.log(impuesto);
        this.impuestoService.postImpuesto(impuesto)
          .subscribe(() => {
			this.getImpuestos();
			
			
			var log: Bitacora;
				log = {
					idUsuario: this.user.id,
					accion: "Creación de impuesto",
					detalle: `Se creó un impuesto (${result.nombre}) ${result.valor}%`,
					id: -1,
					fecha: new Date()
				}
				this.bitacoraService.create(log).subscribe();

          });
        this.getImpuestos();
      }
    });
  }

  eliminar(impuesto: Impuesto): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar el impuesto. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) this.impuestoService.delete(impuesto)
        .subscribe(() => {
		  this.getImpuestos();
		  
			var log: Bitacora;
			log = {
				idUsuario: this.user.id,
				accion: "Eliminación de impuesto",
				detalle: `Se eliminó un impuesto (${impuesto.nombre}) ${impuesto.valor}%`,
				id: -1,
				fecha: new Date()
			}
			this.bitacoraService.create(log).subscribe();
        });
      this.getImpuestos();
    });
  }


  abrirEditar(impuesto: Impuesto): void {

    const dialogRef = this.dialog.open(DialogImpuesto, {
      width: '500px',
      data: {
        accion: "Editar",
        id: impuesto.id,
        nombre: impuesto.nombre,
        valor: impuesto.valor
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);

      if (!this.formularioCompleto(result)) {
        this.mensajeService.add("¡Favor llene todos los datos!");
        return;
      }

      if (!this.datosCorrectosValorPositivo(result)) {
        this.mensajeService.add("¡Favor cerciorarse, que el valor ingresados no sea negativo!");
        return;
      }

      if (result) {
        impuesto = {
          "id": result.id,
          "nombre": result.nombre,
          "valor": result.valor
        }

        console.log(impuesto);

        this.impuestoService.putImpuesto(impuesto)
          .subscribe(() => {
			this.getImpuestos()
			
			var log: Bitacora;
				log = {
					idUsuario: this.user.id,
					accion: "Actualización de impuesto",
					detalle: `Se actualizó un impuesto (${result.nombre}) ${result.valor}%`,
					id: -1,
					fecha: new Date()
				}
				this.bitacoraService.create(log).subscribe();
          });
        this.getImpuestos();
      }
    });
  }
}


@Component({
  selector: 'dialog-impuesto',
  templateUrl: './crear-impuesto.html',
})
export class DialogImpuesto {

  constructor(
    public dialogRef: MatDialogRef<DialogImpuesto>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

