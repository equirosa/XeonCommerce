import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, AfterViewChecked } from '@angular/core';


declare let paypal: any;

export interface DialogData {
	productosPP: any[];
}

@Component({
  selector: 'app-carrito-paypal',
  templateUrl: './paypal.dialog.html',
  styleUrls: ['./paypal.dialog.css']
})

export class CarritoDialogPayPalComponent implements OnInit, AfterViewChecked {

    dialogData: DialogData;
	addScript: boolean = false;

	finalAmount: number;
	productosPP: any[];
	
	currency: string = 'USD';

    constructor(
        public dialogRef: MatDialogRef<CarritoDialogPayPalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
                ) {}


    ngOnInit() {
		this.productosPP = this.data.productosPP;
	}

	paypalConfig = {
		env: 'sandbox',
		client: {
		  sandbox: 'AUIxW_mYvd_h3mMqTtHdrSNMJ9yPmJkpiOCkNq454vDxXCN6hgadgPHIX_9PTeQn1Qv8m-ozcQUQkUjZ' // 'Client ID' de la aplicación
		},
		commit: true,
		payment: (data, actions) => { // se define el pago a realizar
		  return actions.payment.create({
			  transactions: [{
				  amount: {
					total: this.precioPaypal(),
					currency: this.currency,
				  },
				  description: 'Pago por productos o servicios.',
				  /*item_list: {
					items: this.productosPaypal()
				  }*/
				}],
				note_to_payer: 'Favor contactar al administrador del comerico en caso de un problema.'
		  });
		},
		onAuthorize: (data, actions) => { // Corre luego de que hay una autorización exitosa
		  return actions.payment.execute().then((payment) => {
			console.log('Pago exitoso');
			new Promise((resolve, rejects) => {
			  this.dialogRef.close(true);
			})
		  })
		}
	  };
	
	ngAfterViewChecked(): void { // Crea el botón de pago de PayPal al visitar la página.
		if (!this.addScript) {
		  this.addPaypalScript().then(() => { // se crea el botón luego de cargar el script de paypal
			paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
		  })
		}
	  }


	  productosPaypal(){
		let items = [];
		this.productosPP.forEach((i)=>{
			items.push({
				name: i.nombre,
				quantity: i.cantidadCarrito,
				price: Math.round(((((i.precio-i.descuento)*(i.porcientoImpuesto/100+1)/588.54)) + Number.EPSILON) * 100) / 100,
				currency: this.currency
			});
		});
		return items;
	}

	precioPaypal(){
		let items = this.productosPaypal();
		let total = 0;
		items.forEach((i)=>{
			total+= ((i.price*i.quantity));
		});
		return Math.round((total + Number.EPSILON) * 100) / 100;
	}
	
	addPaypalScript() { // Llama el script de pagos de paypal
		this.addScript = true;
		return new Promise((resolve, rejects) => {
		  let scriptTagElement = document.createElement('script');
		  scriptTagElement.src = "https://www.paypalobjects.com/api/checkout.js";
		  scriptTagElement.onload = resolve;
		  document.body.appendChild(scriptTagElement);
		})
	}

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}