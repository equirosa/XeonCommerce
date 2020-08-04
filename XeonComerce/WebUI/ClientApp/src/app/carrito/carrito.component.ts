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
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

	productos: any[];
	displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'impuesto', 'eliminar'];
	datos;
	user: any;
	impuestos: Impuesto[];
  constructor(public dialog: MatDialog, private carritoService:CarritoService, private mensajeService:MensajeService, private accountService:AccountService, private productoService:ProductoService, private impuestoService:ImpuestoService) {
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
	let a = Number(100-(element.precio-element.descuento)/(element.precio)*100);
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

}
