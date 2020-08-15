import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../_models/producto';
import { Impuesto } from '../_models/impuesto';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from './../_services/producto.service';
import { ComercioService } from '../_services/comercio.service';
import { ImpuestoService } from './../_services/impuesto.service';
import { MensajeService } from '../_services/mensaje.service';
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
  user: any;

  constructor(public dialog: MatDialog, http: HttpClient, prodService: ProductoService, private comercioService: ComercioService, impService: ImpuestoService, private mensajeService: MensajeService, private accountService: AccountService) {
	this.accountService.user.subscribe(x => {
		this.user = x;
	});
    this.httpClient = http;
    this.prodService = prodService;
    this.impuestoService = impService;
  }
 

  ngOnInit(): void {
    this.getImpuestos();
    this.getProductos();
    this.getComercios();
  }

  getProductos(): void {

    this.prodService.getProducto()
      .subscribe(productos => {
		  if(this.user.comercio){
			this.dataSource = new MatTableDataSource(productos.filter((i)=>i.idComercio == this.user.comercio.cedJuridica));
      }else if( this.user.empleado ) {
        this.dataSource = new MatTableDataSource(productos.filter((i)=>i.idComercio == this.user.empleado.idComercio));
      }else{
			this.dataSource = new MatTableDataSource(productos);
          }
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      });
  }


  getComercios(): void {
    this.comercioService.get()
      .subscribe(comercios => {
		  if(this.user.comercio) {
			this.comercios = [comercios.find((i)=>i.cedJuridica==this.user.comercio.cedJuridica)];
		  }else{
			this.comercios = comercios;
		  }
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

  formularioCompleto(prod) {
    let formularioCompleto = true;
    if (prod.nombre == "" || prod.precio == "" || prod.impuesto == "" || prod.cantidad == "" || prod.comercio == "" || prod.duracion == "") {
      formularioCompleto = false;
    }
    return formularioCompleto;
  }

  datosCorrectosValoresPositivos(prod) {
    let datosCorrectos = true;
    if (parseInt(prod.precio) < 1 || parseInt(prod.cantidad) < 1 || parseInt(prod.duracion) < 0) {
      datosCorrectos = false;
    }
    return datosCorrectos;
  }

  validarNombre(prod) {
    if (prod.nombre.length < 3) {
      return false;
    }
    return true;
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

    if (!this.formularioCompleto(result)) {
      this.mensajeService.add("¡Favor llene todos los datos!");
      return;
    }

    if (!this.datosCorrectosValoresPositivos(result)) {
      this.mensajeService.add("¡Favor cerciorarse, que los valores ingresados no sean negativos!");
      return;
    }

    if (!this.validarNombre(result)) {
      this.mensajeService.add("¡El nombre del producto debe contener más de 3 letras!");
      return;
    }

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
        "duracion": result.duracion,
        "impuesto": result.impuesto.id
      }
      console.log(producto);
      this.prodService.postProducto(producto)
        .subscribe(() => {
          this.getProductos();
        });
      this.getProductos();
    }
  });
  }



  editarDialog(producto: Producto): void {
    function checkComercio() {
      return producto.idComercio;
    }

    let comercioDelProducto = this.comercios.find(checkComercio);
	
    console.log(comercioDelProducto);
	console.log(producto);
    const dialogRef = this.dialog.open(DialogEditarProducto, {
      width: '500px',
      data: {
        id: producto.id,
        tipo: 1,
        nombre: producto.nombre,
        precio: producto.precio,
		    cantidad: producto.cantidad,
		    impuestos: this.impuestos,
		    impuesto: producto.impuesto,
        descuento: producto.descuento,
        comercio: comercioDelProducto.nombreComercial,
		    duracion: producto.duracion
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`);

      if (!this.formularioCompleto(result)) {
        this.mensajeService.add("¡Favor llene todos los datos!");
        return;
      }

      if (!this.datosCorrectosValoresPositivos(result)) {
        this.mensajeService.add("¡Favor cerciorarse, que los valores ingresados no sean negativos!");
        return;
      }

      if (!this.validarNombre(result)) {
        this.mensajeService.add("¡El nombre del producto debe contener más de 3 letras!");
        return;
      }

      if (result) {
        producto = {
          "id": producto.id,
          "tipo": 1,
          "nombre": result.nombre,
          "precio": result.precio,
          "cantidad": result.cantidad,
          "descuento": producto.descuento,
          "idComercio": producto.idComercio,
          "duracion": result.duracion,
          "impuesto": result.impuesto
        }
		console.log("producto a cambiar", producto);

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

