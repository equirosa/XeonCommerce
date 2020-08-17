import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CitaProducto } from '../_models/cita-producto';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductoService } from '../_services/producto.service';
import { Producto } from '../_models/producto';

@Component({
  selector: 'app-finalizar-cita-productos',
  templateUrl: './finalizar-cita-productos.component.html',
  styleUrls: ['./finalizar-cita-productos.component.css']
})
export class FinalizarCitaProductosComponent implements OnInit {

  @Input()
  cita: CitaProducto;

  @Output()
  finalizarProductos = new EventEmitter<FormArray>();

  productos: Producto[];

  formProductos = new FormArray([]);

  constructor(  private productoService: ProductoService ) { }

  ngOnInit(): void {
    this.cargarProductos();

  }

  cargarProductos(): void {
    this.productoService.getProducto().subscribe({
      next: res => {
        this.productos = res;
        this.agregarForms();

      },
      error: err => {
        console.log(err);
      }
    });
  }

  agregarForms(): void {
    for ( let p of this.cita.productos){
      const nuevoFormGroup = new FormGroup({
        Id: new FormControl(p.id, Validators.required),
        Cantidad: new FormControl(p.cantidad, [
          Validators.required, Validators.min(0),
          Validators.max( this.cantidadMaximaProducto(p.cantidad) )
        ])
      });
      this.formProductos.push(nuevoFormGroup);
    }
  }

  cantidadMaximaProducto(idProducto: number): number {
    let cant: number;
    this.productos.map( p => {
      if (p.id === idProducto){
        cant = p.cantidad;
      }
    });
    return cant;
  }

  guardarProductos(): void {
    this.finalizarProductos.emit(this.formProductos);

    for(let p of this.cita.productos){

    }

  }
}
