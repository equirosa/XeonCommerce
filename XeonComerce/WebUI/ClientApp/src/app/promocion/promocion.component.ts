import { ServiciosService } from './../_services/servicios.service';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { Producto } from './../_models/producto';
import { ProductoService } from './../_services/producto.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogComercio } from '../comercios/comercios.component';
import { CategoriaService } from '../_services/categoria.service';
import { Categoria } from '../_models/categoria';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {

	productos: any[];
	promocionCrear: Producto;
	displayedColumns: string[] = ['id', 'nombre', 'descuento', 'editar', 'eliminar'];
	datos;
	user: any;
	
	constructor(public dialog: MatDialog, private mensajeService: MensajeService, private productoService: ProductoService, private servicioService: ServiciosService, private accountService: AccountService) {
		this.accountService.user.subscribe(x => {
			this.user = x;
		});
	 }
  

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	
	ngOnInit() {
	  this.getProductos();
	}
	
	filtrar(event: Event) {
		const filtro = (event.target as HTMLInputElement).value;
		this.datos.filter = filtro.trim().toLowerCase();
	}


	abrirCrear(): void {

		this.productoService.getProducto()
		.subscribe(productos => {
			this.servicioService.getServicio().subscribe(servicios => {
				if(this.user.comercio) productos = productos.filter((i)=>i.idComercio == this.user.comercio.cedJuridica);
				if(this.user.comercio) servicios = servicios.filter((i)=>i.idComercio == this.user.comercio.cedJuridica);
				productos = productos.filter(a=>a.descuento == 0);
				servicios = servicios.filter(a=>a.descuento == 0);

				let combinados: any[];
				combinados = [...productos, ...servicios];


			const dialogRef = this.dialog.open(PromocionDialog, {
				width: '500px',
				data: {
				  accion: "crear",
				  permitir: !true,
				  id: -1,
				  productos: combinados,
				  productoSelecionado: -1,
				  descuento: 0
				}
			  });



			  dialogRef.afterClosed().subscribe(result => {
				console.log(`Resultado: ${result}`); 
				if (result) {
					if(result.productoSelecionado){
						if(result.productoSelecionado.tipo == 1){
					this.productoService.getProductoById(result.productoSelecionado.id).subscribe((prod) => {
						prod.descuento = result.descuento;
						if(prod.descuento>prod.precio) return this.mensajeService.add("¡El descuento no puede ser mayor que el precio del producto!");
						this.productoService.putProducto(prod).subscribe(()=>{
							this.mensajeService.add("Se creó la promoción.");
							this.getProductos();
						});
					});
				}else{
					this.servicioService.getServicioById(result.productoSelecionado.id).subscribe((prod) => {
						prod.descuento = result.descuento;
						if(prod.descuento>prod.precio) return this.mensajeService.add("¡El descuento no puede ser mayor que el precio del servicio!");
						this.servicioService.putServicio(prod).subscribe(()=>{
							this.mensajeService.add("Se creó la promoción.");
							this.getProductos();
						});
					});
				}
				
				}else{
					this.mensajeService.add("Debe llenar todos los datos")
				}
				}
		  
			  });

			});
		});

  
	  
	}
  
  
	abrirEditar(producto : Producto): void {
	 const dialogRef = this.dialog.open(PromocionDialog, {
		width: '500px',
		data: {
			accion: "editar",
			permitir: !false,
			id: producto.id,
			nombre: producto.nombre,
			productoSelecionado: producto,
			descuento: producto.descuento
		}
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {
			


			if(result.productoSelecionado){
				if(result.productoSelecionado.tipo == 1){
					this.productoService.getProductoById(producto.id)
					.subscribe((prod) => { 
					  prod.descuento=result.descuento;
					  if(prod.descuento>prod.precio) return this.mensajeService.add("¡El descuento no puede ser mayor que el precio del producto!");
					  this.productoService.putProducto(prod).subscribe(()=>{
						  this.mensajeService.add("Se actualizó la promoción.");
						  this.getProductos();
					  });
					});
		}else{
			this.servicioService.getServicioById(producto.id)
			.subscribe((prod) => { 
			  prod.descuento=result.descuento;
			  if(prod.descuento>prod.precio) return this.mensajeService.add("¡El descuento no puede ser mayor que el precio del servicio!");
			  this.servicioService.putServicio(prod).subscribe(()=>{
				  this.mensajeService.add("Se actualizó la promoción.");
				  this.getProductos();
			  });
			});
		}
		
		}else{
			this.mensajeService.add("Debe llenar todos los datos")
		}
		}
  
	  });
	}
  
	
	  getProductos(): void {
		this.productoService.getProducto()
		.subscribe(productos => {
			this.servicioService.getServicio().subscribe(servicios => {
				if(this.user.comercio) productos = productos.filter((i)=>i.idComercio == this.user.comercio.cedJuridica);
				if(this.user.comercio) servicios = servicios.filter((i)=>i.idComercio == this.user.comercio.cedJuridica);
				let combinado = [...productos, ...servicios];
			this.productos = combinado.filter(a=>a.descuento > 0);
			this.productos = this.productos.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
			this.datos = new MatTableDataSource(this.productos);
			this.datos.sort = this.sort;
			this.datos.paginator = this.paginator;
			})
		});
	}
  
  
	delete(producto: Producto): void {

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: "500px",
			data: {
				title: "¿Está seguro?",
				message: "Usted está apunto de eliminar una promoción. "}
		  });
		
		  dialogRef.afterClosed().subscribe(dialogResult => {
			  if(dialogResult){ 

				if(producto.tipo == 1){
					this.productoService.getProductoById(producto.id)
			  .subscribe((prod) => { 
				prod.descuento=0;
				this.productoService.putProducto(prod).subscribe(()=>{
					this.mensajeService.add("Se eliminó la promoción.");
					this.getProductos();
				});
			  });
				}else{
					this.servicioService.getServicioById(producto.id)
			  .subscribe((prod) => { 
				prod.descuento=0;
				this.servicioService.putServicio(prod).subscribe(()=>{
					this.mensajeService.add("Se eliminó la promoción.");
					this.getProductos();
				});
			  });
				}
			}
		 });
	}

}


@Component({
	selector: 'dialog-promocion',
	templateUrl: 'editar.html',
  })
  export class PromocionDialog {
  
	constructor(
	  public dialogRef: MatDialogRef<PromocionDialog>,
	  @Inject(MAT_DIALOG_DATA) public data: any) { }
  
	onNoClick(): void {
	  this.dialogRef.close();
	}

  }