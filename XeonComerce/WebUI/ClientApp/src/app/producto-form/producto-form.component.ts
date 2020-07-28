import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../_models/producto';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from './../_services/producto.service';
import { ComercioService } from '../_services/comercio.service';
import { Comercio } from '../_models/comercio';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  producto: Producto;
  productos: Producto[];
  comercios: Comercio[];
  datosComercios;
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'descuento', 'idComercio', 'duracion', 'editar', 'eliminar'];
  dataSource;
  public httpClient: HttpClient;
  public baseUrlApi: string;
  private prodService: ProductoService;
  public message: string;
  public serviceEndPoint: string;

  constructor(public dialog: MatDialog, http: HttpClient, prodService: ProductoService, private comercioService: ComercioService) {
    this.httpClient = http;
    this.prodService = prodService;
  }

 

  ngOnInit(): void {
    this.getProductos();
    this.getComercios();
  }

  getProductos(): void {
    this.prodService.getProducto()
      .subscribe(productos => {
        this.dataSource = new MatTableDataSource(productos);
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
  const dialogRef = this.dialog.open(DialogProducto, {
    width: '500px',
    data: {
      id: 0,
      tipo: 1,
      nombre: "",
      precio: "",
      cantidad: "",
      descuento: 0,
      comercios: this.comercios,
      comercio: "",
      duracion: ""
    }

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Resultado: ${result}`); 
    console.log('The dialog was closed');
    if (result) {
      let comercio: Comercio;
      comercio = result.comercio;
      console.log(comercio.cedJuridica);
      let producto: Producto;
      producto = {
        "id": result.id,
        "tipo": result.tipo,
        "nombre": result.nombre,
        "precio": result.precio,
        "cantidad": result.cantidad,
        "descuento": result.descuento,
        "idComercio": comercio.cedJuridica,
        "duracion": result.duracion
      }
      console.log(producto);
      this.prodService.postProducto(producto)
        .subscribe(() => {
          this.getProductos()
        });
      window.location.reload();
    } 
  });
}

  eliminar(producto: Producto): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar un producto. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) this.prodService.delete(producto)
        .subscribe(() => {
            this.getProductos();
        });
      window.location.reload();
    });
  }

}

//export interface Producto {
//  tipo: number;
//  nombre: string;
//  precio: number;
//  cantidad: number;
//  descuento: number;
//  idComercio: string;
//  duracion: string;
//}


@Component({
  selector: 'dialog-producto',
  templateUrl: './crear-producto.html',
})
export class DialogProducto {

  constructor(
    public dialogRef: MatDialogRef<DialogProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comercioService: ComercioService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

