import { TransaccionFinanciera } from './../_models/transaccionFinanciera';
import { FacturaMaestroService } from './../_services/facturaMaestro.service';
import { FacturaDetalleService } from './../_services/facturaDetalle.service';
import { FacturaDetalle } from './../_models/facturaDetalle';
import { FacturaMaestro } from './../_models/facturaMaestro';
import { TransaccionFinancieraService } from './../_services/transaccionFinanciera.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { Carrito } from './../_models/carrito';
import { Impuesto } from './../_models/impuesto';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ImpuestoService } from './../_services/impuesto.service';
import { ProductoService } from './../_services/producto.service';
import { AccountService } from './../_services/account.service';
import { MensajeService } from './../_services/mensaje.service';
import { CarritoService } from './../_services/carrito.service';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
declare let paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, AfterViewChecked {
	addScript: boolean = false; // Denota si ya se cargó el script de PayPal

	finalAmount: number; // Monto a cobrar, se puede alterar
	
	currency: string = 'USD'; // Moneda en la que se va a pagar
	productos: any[];
	displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'impuesto', 'eliminar'];
	datos;
	user: any;
	impuestos: Impuesto[];
  constructor(public dialog: MatDialog, private carritoService:CarritoService, private mensajeService:MensajeService,
	 private accountService:AccountService, private productoService:ProductoService, private impuestoService:ImpuestoService,
	 private transaccionFinancieraService:TransaccionFinancieraService, private facturaDetalleService:FacturaDetalleService, private facturaMaestroService:FacturaMaestroService) {
	this.accountService.user.subscribe(x => {
		this.user = x;
	});
 	}

	 @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
	  this.getImpuestos();
	  this.getProductos();
  }

  getImpuestos(): void {
	  this.impuestoService.getImpuesto().subscribe((impuestos)=>this.impuestos=impuestos);
  }

  getProductos(): void {

	this.carritoService.get(this.user.id).subscribe((items)=>{

		this.productoService.getProducto()
		.subscribe(productos => {
			productos = productos.filter(a=>items.find((i)=>i.idProducto==a.id));
			this.productos = productos.map((i)=>{
				let a = items.find((e)=>e.idProducto==i.id);
				let imp = this.impuestos.find((e)=>e.id==i.impuesto);
				if(a) i["cantidadCarrito"] = a.cantidad;
				if(imp) (i["porcientoImpuesto"] = imp.valor, i["nombreImpuesto"]=imp.nombre);
				return i;
			});
			console.log(this.productos);
			this.datos = new MatTableDataSource(this.productos);
			this.datos.sort = this.sort;
			this.finalAmount = this.getCosto(this.datos, true);
			})

	});
}


limpiar(): void {
	let a: Carrito;
	a = {
		idProducto: -1,
		idUsuario: this.user.id,
		cantidad: -1
	}
	this.carritoService.limpiar(a).subscribe(()=>{
		this.getProductos();
	});
}

getCosto(tabla, conImpuestos){
	if(tabla && tabla.filteredData){
		return tabla.filteredData.reduce((acc, cv)=>{
	if(conImpuestos) 
		return acc+= ((cv.precio-cv.descuento)*cv.cantidadCarrito)*((cv.porcientoImpuesto/100)+1);
		else
		return acc+= ((cv.precio-cv.descuento)*cv.cantidadCarrito);
	}, 0);
	}
}

getCantidad(tabla){
	if(tabla && tabla.filteredData){
		return tabla.filteredData.reduce((acc, cv)=>{
		return acc+= cv.cantidadCarrito;
	}, 0);
	}
}

calcularDescuento(element){
	return this.decimales(Number(100-(element.precio-element.descuento)/(element.precio)*100));
}

decimales(a){
	return Math.round(a) == a ? a:a.toFixed(2);
}

calcularPrecio(element){
	return element.descuento ? element.precio-element.descuento:element.precio;
}

eliminar(element){

	const dialogRef = this.dialog.open(ConfirmDialogComponent, {
		maxWidth: "500px",
		data: {
			title: "¿Está seguro?",
			message: "Usted está apunto de eliminar un producto del carrito. "}
	  });
	
	  dialogRef.afterClosed().subscribe(dialogResult => {
		  if(dialogResult){ 

			let a: Carrito;
			a = {
				idProducto: element.id,
				idUsuario: this.user.id,
				cantidad: element.cantidadCarrito
			}
			this.carritoService.delete(a).subscribe(()=>{
				this.getProductos();
			});

		}
	 });

}


onChange($event, element){
	let num = Number($event.target.value);
	if(!num){
		this.getProductos();
		return this.mensajeService.add("Cantidad invalida");
	}
	if(num > element.cantidad){
		this.getProductos();
		return this.mensajeService.add("No existen tantas unidades de dicho producto");
	}

	const dialogRef = this.dialog.open(ConfirmDialogComponent, {
		maxWidth: "500px",
		data: {
			title: "¿Está seguro?",
			message: "Usted está apunto de actualizar la cantidad del producto. ",
			editar: true}
	  });
	
	  dialogRef.afterClosed().subscribe(dialogResult => {
		  if(dialogResult){ 

			let a: Carrito;
			a = {
				idProducto: element.id,
				idUsuario: this.user.id,
				cantidad: num
			}
			this.carritoService.update(a).subscribe(()=>{
				this.getProductos();
			});

		}
	 });

}

comprar(tabla, metodo): void {
	console.log(tabla);
	var fecha = new Date();
	var monto = this.getCosto(tabla, true);

	let a :TransaccionFinanciera  
	a = {
		id: -1,
		idCliente: this.user.id,
		idComercio: tabla.filteredData[0].idComercio,
		metodo: metodo,
		monto: monto,
		estado: "P",
		fecha: fecha
	};
	console.log(a);
	this.transaccionFinancieraService.create(a).subscribe((_)=>{
		if(_){

			this.transaccionFinancieraService.get().subscribe((tranFin)=>{
				var idTransaccion = tranFin.find((i)=>
					i.estado == "P" && i.monto == monto && i.idCliente==this.user.id && i.idComercio == tabla.filteredData[0].idComercio
				);

				if(idTransaccion){

			let b : FacturaMaestro;
			b = {
				idFactura: -1,
				idTransaccion: idTransaccion.id,
				fecha: fecha,
				cedulaJuridica: tabla.filteredData[0].idComercio,
				idCliente: this.user.id
			}		
			console.log(b);
		console.log("Llegamos acá");
		this.facturaMaestroService.create(b).subscribe((fM)=>{
			console.log("FM", fM);

			this.facturaMaestroService.get().subscribe((facturaMaestras)=>{
				var idFactura = facturaMaestras.find((i)=>
					i.idTransaccion == idTransaccion.id && i.idCliente == this.user.id && i.cedulaJuridica==tabla.filteredData[0].idComercio
				);

				if(idFactura){
				
			tabla.filteredData.forEach((i)=>{
				let c : FacturaDetalle;
				c = {
					idLinea: -1,
					idProducto: i.id,
					valor: i.precio,
					descuento: i.descuento,
					cantidad: i.cantidadCarrito,
					iva: i.porcientoImpuesto,
					idFactura: idFactura.idFactura,
					totalLinea: Number(this.decimales(((i.precio-i.descuento)*i.cantidadCarrito)*((i.porcientoImpuesto/100)+1)))
				}
				console.log(c);
				this.facturaDetalleService.create(c).subscribe((l)=>{
					console.log(l)
				});
			});

			console.log("Fin");


		}else{
			this.mensajeService.add("Ha ocurrido un error, porfavor reintentar en unos minutos");
		}

			});

		});
		}else{
			this.mensajeService.add("Ha ocurrido un error, porfavor reintentar en unos pocos minutos");
		}
		});
		}else{
			this.mensajeService.add("Ha ocurrido un error, porfavor reintentar en unos minutos");
		}
	});


}

paypalConfig = {
  env: 'sandbox',
  client: {
	sandbox: 'AUIxW_mYvd_h3mMqTtHdrSNMJ9yPmJkpiOCkNq454vDxXCN6hgadgPHIX_9PTeQn1Qv8m-ozcQUQkUjZ' // 'Client ID' de la aplicación
  },
  commit: true,
  payment: (data, actions) => { // se define el pago a realizar
	return actions.payment.create({
	  payment: {
		transactions: [
		  {
			amount: { total: this.finalAmount, currency: this.currency }
		  }
		]
	  }
	});
  },
  onAuthorize: (data, actions) => { // Corre luego de que hay una autorización exitosa
	return actions.payment.execute().then((payment) => {
	  console.log('Payment Successful');
	  new Promise((resolve, rejects) => {
		let successElement = document.createElement('h2');
		// Crea un elemento de HTML para notificar que el pago fue exitoso.
		successElement.textContent = "Payment Successful at: " + new Date() + '\n Amount: ' + this.finalAmount + ' ' + this.currency;
		successElement.onload = resolve;
		document.body.appendChild(successElement);
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

addPaypalScript() { // Llama el script de pagos de paypal
  this.addScript = true;
  return new Promise((resolve, rejects) => {
	let scriptTagElement = document.createElement('script');
	scriptTagElement.src = "https://www.paypalobjects.com/api/checkout.js";
	scriptTagElement.onload = resolve;
	document.body.appendChild(scriptTagElement);
  })
}

}
