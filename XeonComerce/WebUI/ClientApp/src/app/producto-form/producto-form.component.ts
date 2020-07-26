import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from './producto';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  producto: Producto;
  productos: IProducto[];
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'descuento', 'idComercio', 'duracion'];
  dataSource;

constructor(public dialog: MatDialog) { }

  ngOnInit(): void {;
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogProducto, {
    width: '500px',
    data: {
      tipo: 1,
      nombre: "",
      precio: -1,
      cantidad: -1,
      descuento: -1,
      idComercio: "",
      duracion: -1,
    }

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Resultado: ${result}`); 
    console.log('The dialog was closed');
    this.producto.nombre = result.nombre;
    this.producto.precio = result.precio;
    this.producto.cantidad = result.cantidad;
    this.producto.descuento = result.descuento;
    this.producto.idComercio = result.idComercio;
    this.producto.duracion = result.duracion;
  });
 }

 
}

export interface IProducto {
  tipo: number;
  nombre: string;
  precio: number;
  cantidad: number;
  descuento: number;
  idComercio: string;
  duracion: string;
}


@Component({
  selector: 'dialog-producto',
  templateUrl: './crear-producto.html',
})
export class DialogProducto {

  constructor(
    public dialogRef: MatDialogRef<DialogProducto>,
    @Inject(MAT_DIALOG_DATA) public data: IProducto) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

