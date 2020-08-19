import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../_models/producto';

@Component({
  selector: 'app-finalizar-nuevo-producto',
  templateUrl: './finalizar-nuevo-producto.component.html',
  styleUrls: ['./finalizar-nuevo-producto.component.css']
})
export class FinalizarNuevoProductoComponent implements OnInit {

  formGroupNuevoProducto = new FormGroup({
    Producto: new FormControl('', Validators.required),
    Cantidad: new FormControl('', [Validators.required, Validators.min(0)])
  });

  producto: Producto; 

  productos: Producto[];
  productosSeleccionados: Producto[];


  constructor(public dialogRef: MatDialogRef<FinalizarNuevoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {    
    // this.productosSeleccionados = this.data.productosSeleccionados;
    if(this.data.tipo === 'crear'){
      this.productos = this.data.productos;
      
    } else {
      this.producto = this.data.producto;
      this.productos = this.data.productos;
      this.llenarForm();
    }
    
  }

  agregar(): void {

    if(this.data.tipo === 'crear'){
      this.producto = this.productos.filter(p => p.id === this.formGroupNuevoProducto.get('Producto').value)[0];
    }else {
      this.producto.id = this.formGroupNuevoProducto.get('Producto').value;
    }

    this.producto.cantidad = this.formGroupNuevoProducto.get('Cantidad').value;

    this.dialogRef.close(this.producto);
  }

  llenarForm(): void {
    this.formGroupNuevoProducto.get('Producto').setValue(this.producto.id);
    this.formGroupNuevoProducto.get('Cantidad').setValue(this.producto.cantidad);
  }

}
