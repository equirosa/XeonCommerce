import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../_models/producto';
import { Impuesto } from '../_models/impuesto';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from './../_services/producto.service';
import { ComercioService } from '../_services/comercio.service';
import { ImpuestoService } from './../_services/impuesto.service';
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
  impuestos: Impuesto[];
  datosComercios;
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'impuesto', 'cantidad', 'descuento', 'idComercio', 'duracion', 'editar', 'eliminar'];
  dataSource;
  public httpClient: HttpClient;
  public baseUrlApi: string;
  private prodService: ProductoService;
  private impuestoService: ImpuestoService;
  public message: string;
  public serviceEndPoint: string;

  constructor(public dialog: MatDialog, http: HttpClient, prodService: ProductoService, private comercioService: ComercioService, impService: ImpuestoService) {
    this.httpClient = http;
    this.prodService = prodService;
    this.impuestoService = impService;
  }
 

  ngOnInit(): void {
    this.getComercios();
    this.getImpuestos();
    this.getProductos();
  }

  getProductos(): void {

    this.prodService.getProducto()
      .subscribe(productos => {
        let datosProducto: Producto[] = productos;
        let infoImpuestos: Impuesto[] = this.impuestos;
        for (var i = 0; i < datosProducto.length; i++) {
          for (var j = 0; j < infoImpuestos.length; j++) {
            let impuestoId = infoImpuestos[j].id;
            if (datosProducto[i].impuesto == impuestoId) {
              datosProducto[i].impuesto = infoImpuestos[j].valor;
            }
          }
        }
        this.dataSource = new MatTableDataSource(datosProducto);
      });
  }


  getComercios(): void {
    this.comercioService.get()
      .subscribe(comercios => {
        this.comercios = comercios;
        console.log(this.comercios);
      });
  }

  getImpuestos(): void {
    this.impuestoService.getImpuesto()
      .subscribe(impuestos => {
        this.impuestos = impuestos;
        console.log(this.impuestos);
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
      impuestos: this.impuestos,
      impuesto: "",
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
      let impuesto: Impuesto;
      impuesto = result.impuesto;
      console.log(impuesto.id);
      let producto: Producto;
      producto = {
        "id": result.id,
        "tipo": result.tipo,
        "nombre": result.nombre,
        "precio": result.precio,
        "cantidad": result.cantidad,
        "descuento": result.descuento,
        "idComercio": comercio.cedJuridica,
        "duracion": result.duracion,
        "impuesto": impuesto.id
      }
      console.log(producto);
      this.prodService.postProducto(producto)
        .subscribe(() => {
          this.getProductos();
        });
      window.location.reload();
    }
  });
  }



  editarDialog(producto: Producto): void {
    function checkComercio() {
      return producto.idComercio;
    }

    let comercioDelProducto = this.comercios.find(checkComercio);

    console.log(comercioDelProducto);


    let impuestos: Impuesto[] = this.impuestos;
    let nombreImpuesto = "";
    for (var i = 0; i < impuestos.length; i++) {
      if (producto.impuesto == impuestos[i].valor)
      {
        nombreImpuesto = impuestos[i].nombre;
      }
    }
    //let impuestoDelProducto = this.impuestos.find(checkImpuesto);
    //let impuestoProd = impuestoDelProducto.nombre;
    console.log(nombreImpuesto);

    const dialogRef = this.dialog.open(DialogEditarProducto, {
      width: '500px',
      data: {
        id: producto.id,
        tipo: 1,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
        comercio: comercioDelProducto.nombreComercial,
        duracion: producto.duracion,
        impuestos: this.impuestos,
        impuestoProd: nombreImpuesto
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);
      if (result) {
        let impuesto: Impuesto;
        impuesto = result.impuestoProd;
        console.log(impuesto.id);
        let cambiosProducto: Producto;
        producto = {
          "id": producto.id,
          "tipo": 1,
          "nombre": result.nombre,
          "precio": result.precio,
          "cantidad": result.cantidad,
          "descuento": producto.descuento,
          "idComercio": producto.idComercio,
          "duracion": result.duracion,
          "impuesto": impuesto.id
        }

        console.log(producto);

        this.prodService.putProducto(producto)
          .subscribe(() => {
            this.getProductos()
          });
        this.getProductos();
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
      this.getProductos();
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


@Component({
  selector: 'dialog-editar-producto',
  templateUrl: './editar-producto.html',
})
export class DialogEditarProducto {

  constructor(
    public dialogRef: MatDialogRef<DialogEditarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comercioService: ComercioService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

