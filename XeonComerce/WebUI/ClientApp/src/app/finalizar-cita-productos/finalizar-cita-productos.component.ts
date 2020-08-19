import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CitaProducto } from '../_models/cita-producto';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductoService } from '../_services/producto.service';
import { Producto } from '../_models/producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FinalizarNuevoProductoComponent } from '../_components/finalizar-nuevo-producto/finalizar-nuevo-producto.component';


@Component({
  selector: 'app-finalizar-cita-productos',
  templateUrl: './finalizar-cita-productos.component.html',
  styleUrls: ['./finalizar-cita-productos.component.css']
})
export class FinalizarCitaProductosComponent implements OnInit {

  @Input()
  cita: CitaProducto;

  @Output()
  finalizarProductos = new EventEmitter<Producto[]>();

  // @Output()
  // finalizarProductos = new EventEmitter<FormArray>();

  // productos: Producto[];

  // formProductos = new FormArray([]);

  productos: Producto[]; // ese array es para poder comprar nuevos productos ( se mostrara en el select)
  productosCita: Producto[]; // este array es el que se envia al componente padre para que la cita sea finalizada
  productosCitaTabla = new MatTableDataSource<Producto>(); // Es para mostrar los producos que pertenecen a la cita 

  columnas: string[] = ['producto', 'cantidad', 'editar', 'eliminar'];

  constructor(  private productoService: ProductoService, public dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.productosCitaTabla.data = this.cita.productos;
    this.productosCita = this.cita.productos;
    this.cargarProductos();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productosCitaTabla.filter = filterValue.trim().toLowerCase();
  }

  cargarProductos(): void {
    this.productoService.getProducto().subscribe({
      next: res => {
        this.productos = res;
       // this.agregarForms();

      },
      error: err => {
        console.log(err);
      }
    });
  }

  editar(producto: Producto): void {

    const dialogRef = this.dialog.open(FinalizarNuevoProductoComponent, {
      width: '350px',
      height: '300px',
      data: {tipo: 'editar', productos: this.productos, producto: producto}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.cita.productos = this.cita.productos.map( p => {
        if( p.id === dialogResult.id ){
          return dialogResult;
        }
        return p;
      });
    });
    console.log(this.cita);
    this.finalizarProductos.emit(this.productosCita);

  }

  eliminar(producto: Producto): void {
    
    this.productosCita = this.productosCita.map( p => {
      if ( p.id === producto.id){
        p.cantidad = 0;
      }
      return p;
    });

    this.finalizarProductos.emit(this.productosCita);
  }

  agregarProducto(): void {
    var prod: Producto[] = this.productos.filter(p => p.idComercio === this.cita.idComercio);

    for (let i = 0; i < prod.length; i++){
      for(let pc of this.productosCita){
        if(pc.id === prod[i].id){
          prod.slice(i, i++);

        }
      }
    }
   
    console.log(prod);
    

    const dialogRef = this.dialog.open(FinalizarNuevoProductoComponent, {
      width: '350px',
      height: '300px',
      data: {tipo: 'crear', productos: prod, producto: null}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.cita.productos.push(dialogResult);
      console.log(this.cita);
      this.finalizarProductos.emit(this.productosCita);
    });


  }

  // agregarForms(): void {
  //   for ( let p of this.cita.productos){
  //     const nuevoFormGroup = new FormGroup({
  //       Id: new FormControl(p.id, Validators.required),
  //       Cantidad: new FormControl(p.cantidad, [
  //         Validators.required, Validators.min(0),
  //         Validators.max( this.cantidadMaximaProducto(p.cantidad) )
  //       ])
  //     });
  //     this.formProductos.push(nuevoFormGroup);
  //   }
  // }

  // cantidadMaximaProducto(idProducto: number): number {
  //   let cant: number;
  //   this.productos.map( p => {
  //     if (p.id === idProducto){
  //       cant = p.cantidad;
  //     }
  //   });
  //   return cant;
  // }

  // guardarProductos(): void {
  //   this.finalizarProductos.emit(this.formProductos);

  //   for(let p of this.cita.productos){

  //   }

  //}
}
