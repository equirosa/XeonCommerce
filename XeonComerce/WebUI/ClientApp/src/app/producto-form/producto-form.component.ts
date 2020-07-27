import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../_models/producto';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from './../_services/producto.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  producto: Producto;
  productos: Producto[];
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'descuento', 'idComercio', 'duracion', 'editar', 'eliminar'];
  dataSource;
  public httpClient: HttpClient;
  public baseUrlApi: string;
  private prodService: ProductoService;
  public message: string;
  public serviceEndPoint: string;

  constructor(public dialog: MatDialog, http: HttpClient, prodService: ProductoService) {
    this.httpClient = http;
    this.prodService = prodService;

  }

 

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.prodService.getProducto()
      .subscribe(productos => {
        this.dataSource = new MatTableDataSource(productos);
      });
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
      idComercio: "",
      duracion: "",
    }

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Resultado: ${result}`); 
    console.log('The dialog was closed');
    if (result) {
      let producto: Producto;
      producto = {
        "id": result.id,
        "tipo" : result.tipo,
        "nombre": result.nombre,
        "precio": result.precio,
        "cantidad": result.cantidad,
        "descuento": result.descuento,
        "idComercio": result.idComercio,
        "duracion": result.duracion
      }
      console.log(producto);
      this.prodService.postProducto(producto)
        .subscribe(() => {
          this.getProductos()
        });
    }
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
    @Inject(MAT_DIALOG_DATA) public data: Producto) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

