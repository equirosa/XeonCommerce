import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-carrito-direccion',
  templateUrl: './destino.dialog.html',
  styleUrls: ['./destino.dialog.css']
})

export class CarritoDialogDireccionComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<CarritoDialogDireccionComponent>) {}

    ngOnInit() {

    }

    miDireccion(): void {
        this.dialogRef.close(1);
	}
	
    dirComercio(): void {
        this.dialogRef.close(2);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}