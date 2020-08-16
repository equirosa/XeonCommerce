import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../_models/producto';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto-cita',
  templateUrl: './producto-cita.component.html',
  styleUrls: ['./producto-cita.component.css']
})
export class ProductoCitaComponent implements OnInit {

  producto: Producto;
  cantidad: number;
  FormCantidadProducto = new FormGroup({
    Cantidad: new FormControl()
  });

  constructor( 
    public dialogRef: MatDialogRef<ProductoCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,) { }

   ngOnInit(): void {
     this.producto = this.data.producto;

    this.FormCantidadProducto.get('Cantidad').setValidators([Validators.required, Validators.min(1), Validators.max(this.producto.cantidad)]);

     this.FormCantidadProducto.valueChanges.subscribe({
       next: res => {
         //console.log(res);
         this.cantidad = res.Cantidad;
       }
     });
   }

   agregarCantidad(): void {

     if ( this.FormCantidadProducto.valid ){
       this.dialogRef.close(this.cantidad);
       this._snackBar.open('Se ha agregado el producto a la cita', '', {
         duration: 2500,
       });
     } else {
        if (this.cantidad === 0){
          this._snackBar.open('La cantidad no puede ser cero!', '', {
            duration: 2500
          });
        } else {
          this._snackBar.open(`Solo existen ${this.producto.cantidad} unidades disponibles`, '', {
            duration: 2500
          });
        }
     }
   }


}
