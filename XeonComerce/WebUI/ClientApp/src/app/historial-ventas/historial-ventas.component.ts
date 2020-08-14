import { DialogUsuario } from './../bitacora/bitacora.component';
import { CarritoService } from '../_services/carrito.service';
import { CarritoDialogSinpeComponent } from '../_components/carrito/sinpe/sinpe.dialog';
import { CarritoDialogFinComponent } from '../_components/carrito/fin/fin.dialog';
import { CarritoDialogPayPalComponent } from '../_components/carrito/paypal/paypal.dialog';
import { CarritoDialogMetodoPagoComponent } from '../_components/carrito/metodo-pago/metodo-pago.dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from '../_services/servicios.service';
import { ProductoService } from '../_services/producto.service';
import { FacturaDetalle } from '../_models/facturaDetalle';
import { TransaccionFinancieraService } from '../_services/transaccionFinanciera.service';
import { FacturaMaestroService } from '../_services/facturaMaestro.service';
import { FacturaMaestro } from '../_models/facturaMaestro';
import { FacturaDetalleService } from '../_services/facturaDetalle.service';
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
	selector: 'app-historial-ventas',
	templateUrl: './historial-ventas.component.html',
	styleUrls: ['./historial-ventas.component.css']
  })
  export class HistorialVentasComponent implements OnInit {

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
			
			if(this.user.tipo != "A"){
				facMaestro = facturas.filter(i=> i.cedulaJuridica == this.user.comercio.cedJuridica);
			}else{
				facMaestro = facturas;
			}
			  
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

						//this.historial = this.historial.filter((i)=>i.transaccionFinanciera.monto > 0);						
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

	verUsuario(id: string): void {
		const dialogRef = this.dialog.open(DialogUsuario, {
			maxWidth: "500px",
			data: {
				id: id
			}
	});
}

}