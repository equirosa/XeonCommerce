import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-carrito-metodo-pago',
  templateUrl: './metodo-pago.dialog.html',
  styleUrls: ['./metodo-pago.dialog.css']
})

export class CarritoDialogMetodoPagoComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<CarritoDialogMetodoPagoComponent>) {}

    ngOnInit() {

    }

    paypal(): void {
        this.dialogRef.close(1);
	}
	
    sinpe(): void {
        this.dialogRef.close(2);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}