import { CarritoService } from './../_services/carrito.service';
import { CarritoDialogSinpeComponent } from './../_components/carrito/sinpe/sinpe.dialog';
import { CarritoDialogFinComponent } from './../_components/carrito/fin/fin.dialog';
import { CarritoDialogPayPalComponent } from './../_components/carrito/paypal/paypal.dialog';
import { CarritoDialogMetodoPagoComponent } from './../_components/carrito/metodo-pago/metodo-pago.dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from './../_services/servicios.service';
import { ProductoService } from './../_services/producto.service';
import { FacturaDetalle } from './../_models/facturaDetalle';
import { TransaccionFinancieraService } from './../_services/transaccionFinanciera.service';
import { FacturaMaestroService } from './../_services/facturaMaestro.service';
import { FacturaMaestro } from './../_models/facturaMaestro';
import { FacturaDetalleService } from './../_services/facturaDetalle.service';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { Comercio } from '../_models/comercio';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ComercioService } from '../_services/comercio.service';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DireccionService } from '../_services/direccion.service';
import { DialogDireccion } from '../comercios/comercios.component';
import {PageEvent} from '@angular/material/paginator';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
	selector: 'app-historial-compras',
	templateUrl: './historial-compras.component.html',
	styleUrls: ['./historial-compras.component.css']
  })
  export class HistorialComprasComponent implements OnInit {

	historial: any[] = [];
	user: User;
	prodservs: any[] = [];
	datos;
	displayedColumns: string[] = ['id', 'nombre', 'cantidad', 'impuesto', 'precio'];
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	constructor(public dialog: MatDialog, private comercioService: ComercioService, private facturaDetalleService: FacturaDetalleService,
		private productoService: ProductoService, private serviciosService: ServiciosService,
		 private facturaMaestroService: FacturaMaestroService, private transaccionFinancieraService: TransaccionFinancieraService, private direccionService: DireccionService,
		  private mensajeService: MensajeService, private ubicacionService: UbicacionService, private accountService: AccountService, private carritoService: CarritoService) {
			this.accountService.user.subscribe(x => {
				this.user = x;
			});
		  }
  

	
	ngOnInit() {
	  this.getCompras();
	}
	
	  getCompras(): void {
		this.facturaMaestroService.get()
		.subscribe(facturas => {
			let facMaestro: any[];
			  facMaestro = facturas.filter(i=> i.idCliente == this.user.id);
			  
			  facMaestro.forEach((i, index)=>{
				  let subir = i;
				this.facturaDetalleService.getBy(i.idFactura).subscribe((detalles)=>{
					subir["detalles"] =  detalles;
					this.productoService.getProductoById(detalles[0].idProducto).subscribe((producto)=>{
						if(producto){
							if(subir["detalles"].length == 1){
								subir["tipo"] = "producto";
							}else{
								subir["tipo"] = "productos";
							}
						}else{
							if(subir["detalles"].length == 1){
								subir["tipo"] = "servicio";
							}else{
								subir["tipo"] = "servicios";
							}
						}

					this.transaccionFinancieraService.getBy(i.idTransaccion).subscribe((transaccionFinanciera)=>{
						subir["transaccionFinanciera"] = transaccionFinanciera;
						subir["pendiente"] = transaccionFinanciera.estado == "P";
						this.historial.push(subir);
						
						this.historial = this.historial.sort((a, b) => {
							return b.idFactura - a.idFactura;
						});
					});


				});

				});

			  });

		});
	}
	

	limpiar(){
		this.prodservs = [];
		this.datos = new MatTableDataSource(this.prodservs);
	}

	getProductos(detalles){
		detalles.forEach(i => {
			this.productoService.getProductoById(i.idProducto).subscribe((producto)=>{
				if(producto){
					let obj = {
						id: producto.id,
						precio: i.valor-i.descuento,
						descuento: i.descuento,
						cantidad: i.cantidad,
						impuesto: i.iva,
						nombre: producto.nombre,
						cantidadCarrito: i.cantidad,
						porcientoImpuesto: i.iva,
						idComercio: producto.idComercio
					}
					this.prodservs.push(obj);
					this.datos = new MatTableDataSource(this.prodservs);
					this.datos.sort = this.sort;
				}else{
					this.serviciosService.getServicioById(i.idProducto).subscribe((servicio)=>{
						if(servicio){
						let obj = {
							id: servicio.id,
							precio: i.valor-i.descuento,
							descuento: i.descuento,
							cantidad: i.cantidad,
							impuesto: i.iva,
							nombre: servicio.nombre,
							cantidadCarrito: i.cantidad,
							porcientoImpuesto: i.iva,
							idComercio: servicio.idComercio
						}
						this.prodservs.push(obj);
						this.datos = new MatTableDataSource(this.prodservs);
						this.datos.sort = this.sort;
						}
					});
				}
			});
		});
	}


	pagar(transaccion, idFactura){
		let dialogRef: any;
		dialogRef = this.dialog.open(CarritoDialogMetodoPagoComponent, {maxWidth: "500px"});
		dialogRef.afterClosed().subscribe(metodoPago => {
			if(metodoPago){
				if(metodoPago == 1){
					dialogRef = this.dialog.open(CarritoDialogPayPalComponent, {maxWidth: "600px", data: { productosPP: this.prodservs }});
					dialogRef.afterClosed().subscribe(paypal => {
						console.log("Pago exitoso (PayPal):", !!paypal);
						if(paypal){
							this.despuesDePago(transaccion, idFactura, "PAYPAL");
						}
					});
				}else{
					this.comercioService.getBy(this.prodservs[0].idComercio).subscribe((comercio)=>{
						if(comercio && comercio.telefono){
							dialogRef = this.dialog.open(CarritoDialogSinpeComponent, {maxWidth: "600px", data: {
								telefono: comercio.telefono,
								cantidad: Math.round((transaccion.monto + Number.EPSILON) * 100) / 100
							}});

							dialogRef.afterClosed().subscribe(sinpe => {
								console.log("Pago exitoso (Sinpe):", !!sinpe);
								if(sinpe){
									this.despuesDePago(transaccion, idFactura, "SINPE");
								}
							});

						}else{
							this.mensajeService.add("No se encontró el comercio. Por favor reintente en unos minutos");
						}
					});
					

				}
			}
		});
	}




	despuesDePago(transaccion, idFactura, metodo): void {
		var fecha = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Costa_Rica"}));
	
		transaccion.estado = 'F';
		transaccion.metodo = metodo;

		this.transaccionFinancieraService.update(transaccion).subscribe((_)=>{
			if(_){
				const dialogRef = this.dialog.open(CarritoDialogFinComponent, {
					maxWidth: "400px",
					data: {
						idFactura: idFactura
					}
				  });

				  this.factura(idFactura.idFactura, transaccion.id);

			}else{
				this.mensajeService.add("Ha ocurrido un error, porfavor reintente en unos minutos");
			}
	
		});
	
	
	}

	factura(numFactura, numTransaccion) : void{

		this.comercioService.getBy(this.prodservs[0].idComercio).subscribe((comercio)=>{
		
			this.direccionService.getBy(comercio.direccion).subscribe((direccion)=>{
				let xml = this.xml(comercio, direccion, numFactura, numTransaccion);
				let pdf = this.pdf(comercio, direccion, numFactura, numTransaccion);

				this.carritoService.factura({xml: xml, html: pdf}, this.user.id).subscribe();
		});
	});
	
	}



	pdf(comercio: any, direccion: any, numFactura, numTransaccion){
		let css = `<head>
			<style>
			table {
			  border-collapse: collapse;
			  width: 100%;
			}
			
			th, td {
			  text-align: left;
			  padding: 8px;
			}
			
			tr:nth-child(even){background-color: #f2f2f2}
			
			th {
			  background-color: #4CAF50;
			  color: white;
			}
			</style>
			</head>`;
			let items = this.prodservs.reduce((acc, cv)=>{
				return acc+`
				<tr>
				<td>${cv.id}</td>
				<td>${cv.nombre}</td>
				<td>${cv.cantidad}</td>
				<td>${cv.impuesto}%</td>
				<td>${cv.precio.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
				<td>${cv.descuento.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
				</tr>
				\n`;
			}, ""); 
	
			return `${css}
			\n<h1>Factura #${numFactura}</h1>
			\n<h2>Transacción #${numTransaccion}</h2>
			\n<h2>${comercio.nombreComercial} ${comercio.cedJuridica}</h2>
			\n<h3>Dirección ${direccion.provincia} || ${direccion.canton} || ${direccion.distrito} || ${direccion.sennas}</h3>
			\n<h3>${new Date(new Date().toLocaleString("en-US", {timeZone: "America/Costa_Rica"})).toISOString().slice(0,10)}</h3>
			\n<h3>Cliente: ${this.user.nombre} ${this.user.apellidoUno} ${this.user.apellidoDos} (${this.user.id})</h3>
			<table style="width:100%">
			<tr>
				<th>Id</th>
				<th>Nombre</th>
				<th>Cantidad</th>
				<th>Impuesto</th>
				<th>Precio</th>
				<th>Descuento</th>
			</tr>
			  ${items}
			  <tr>
				  <td></td>
				  <td></td>
				  <td></td>
				  <td></td>
				  <td>Subtotal: ${(Math.round((this.getCosto(this.prodservs, false) + Number.EPSILON) * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
				  <td>Total: ${(Math.round((this.getCosto(this.prodservs, true) + Number.EPSILON) * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
			  </tr>
		  </table>`;
	}
	
	
	
	xml(comercio: any, direccion: any, numFactura, numTransaccion){
	
		let items = this.prodservs.reduce((acc, cv)=>{
			return acc+= `<item>
						<idProducto>${cv.id}</idProducto>
						<nombre>${cv.nombre}</nombre>
						<cantidad>${cv.cantidad}</cantidad>
						<impuesto>${cv.impuesto}</impuesto>
						<precio>${cv.precio.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</precio>
						<descuento>${cv.descuento.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</descuento>
					</item>`;
		}, "");
		
			return `<?xml version="1.0" encoding="UTF-8"?>
			<Factura>
			  <Comercio>
				  <nombreComercial>${comercio.nombreComercial}</nombreComercial>
				  <cedJuridica>${comercio.cedJuridica}</cedJuridica>
				  <fecha>${new Date(new Date().toLocaleString("en-US", {timeZone: "America/Costa_Rica"})).toISOString().slice(0,10)}</fecha>
				  <numFactura>${numFactura}</numFactura>
				  <numTransaccion>${numTransaccion}</numTransaccion>
				  <direccion>
					   <provincia>${direccion.provincia}</provincia>
					   <canton>${direccion.canton}</canton>
					   <distrito>${direccion.distrito}</distrito>
					   <sennas>${direccion.sennas}</sennas>
				  </direccion>
			  </Comercio>
			  <Cliente>
				  <nombre>${this.user.nombre}</nombre>
				  <apellidoUno>${this.user.apellidoUno}</apellidoUno>
				  <apellidoDos>${this.user.apellidoDos}</apellidoDos>
				  <cedula>${this.user.id}</cedula>
				  <total>${(Math.round((this.getCosto(this.prodservs, true) + Number.EPSILON) * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</total>
				  <subtotal>${(Math.round((this.getCosto(this.prodservs, false) + Number.EPSILON) * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</subtotal>
				  ${items}
			  </Cliente>
			</Factura>`;
	}



	getCosto(productos, conImpuestos){
		if(productos){
			return productos.reduce((acc, cv)=>{
		if(conImpuestos) 
			return acc+= ((cv.precio-cv.descuento)*cv.cantidad)*((cv.impuesto/100)+1);
			else
			return acc+= ((cv.precio-cv.descuento)*cv.cantidad);
		}, 0);
		}
	}

	
}