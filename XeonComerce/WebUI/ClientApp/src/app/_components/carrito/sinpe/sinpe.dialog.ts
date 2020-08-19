import { MensajeService } from './../../../_services/mensaje.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


export interface DialogData {
    cantidad: number;
	telefono: string;
}

@Component({
  selector: 'app-carrito-sinpe',
  templateUrl: './sinpe.dialog.html',
  styleUrls: ['./sinpe.dialog.css']
})

export class CarritoDialogSinpeComponent implements OnInit {

    dialogData: DialogData;
    cantidad:number;
	telefono:string;
	form:FormGroup;
    constructor(public dialogRef: MatDialogRef<CarritoDialogSinpeComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private mensajeService:MensajeService) {}

    ngOnInit() {
		this.form = this.formBuilder.group({
            codigo: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3)]]
        });
    }

    comprobar(): void {
        if (this.form.invalid) {
            this.mensajeService.add("El comprobante está compuesto por solamente números.")
        }else{
			this.dialogRef.close(true);
		}
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}