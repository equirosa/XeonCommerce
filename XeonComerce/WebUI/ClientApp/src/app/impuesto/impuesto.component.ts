import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Impuesto } from '../_models/impuesto';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ImpuestoService } from './../_services/impuesto.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent implements OnInit {

  impuesto: Impuesto;
  impuestos: Impuesto[];
  displayedColumns: string[] = ['id', 'nombre', 'valor', 'editar', 'eliminar'];
  dataSource;
  public httpClient: HttpClient;
  public baseUrlApi: string;
  private impuestoService: ImpuestoService;
  public message: string;
  public serviceEndPoint: string;

  constructor(public dialog: MatDialog, http: HttpClient, impService: ImpuestoService) {
    this.httpClient = http;
    this.impuestoService = impService;
  }

  ngOnInit(): void {
    //this.getImpuestos();
  }

  //getImpuestos(): void {
  //  this.impuestoService.getImpuestos()
  //    .subscribe(impuestos => {
  //      this.dataSource = new MatTableDataSource(impuestos);
  //    });
  //}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogImpuesto, {
      width: '500px',
      data: {
        id: 0,
        nombre: "",
        valor: "",
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);
      console.log('The dialog was closed');
      //if (result) {
      //  let impuesto: Impuesto;
      //  impuesto = {
      //    "id": result.id,
      //    "nombre": result.nombre,
      //    "valor": result.valor
      //  }
      //  console.log(impuesto);
      //  this.impuestoService.postImpuesto(impuesto)
      //    .subscribe(() => {
      //      this.getImpuestos()
      //    });
      //}
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
    @Inject(MAT_DIALOG_DATA) public data: Impuesto) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

