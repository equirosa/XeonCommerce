import { FacturaMaestro } from './../../../_models/facturaMaestro';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


export interface DialogData {
	idFactura: FacturaMaestro;
}


@Component({
  selector: 'app-carrito-direccion',
  templateUrl: './fin.dialog.html',
  styleUrls: ['./fin.dialog.css']
})

export class CarritoDialogFinComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CarritoDialogFinComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
                ) {}

    ngOnInit() {

    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}