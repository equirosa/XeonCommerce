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

	productos: Producto[];
	promocionCrear: Producto;
	displayedColumns: string[] = ['id', 'nombre', 'descuento', 'editar', 'eliminar'];
	datos;
	
	constructor(public dialog: MatDialog, private mensajeService: MensajeService, private productoService: ProductoService) { }
  

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
			productos = productos.filter(a=>a.descuento == 0);

			const dialogRef = this.dialog.open(PromocionDialog, {
				width: '500px',
				data: {
				  accion: "crear",
				  permitir: !true,
				  id: -1,
				  productos: productos,
				  productoSelecionado: -1,
				  descuento: 0
				}
			  });



			  dialogRef.afterClosed().subscribe(result => {
				console.log(`Resultado: ${result}`); 
				if (result) {
					this.productoService.getProductoById(result.productoSelecionado).subscribe((prod) => {
						prod.descuento = result.descuento;
						if(prod.descuento>prod.precio) return this.mensajeService.add("¡El descuento no puede ser mayor que el producto!");
							
						prod.tipo = 1;
						this.productoService.putProducto(prod).subscribe(()=>{
							this.mensajeService.add("Se creó la promoción.");
							this.getProductos();
						});
					});
				}
		  
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
			productoSelecionado: producto.id,
			descuento: producto.descuento
		}
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {
  
			this.productoService.getProductoById(producto.id)
			.subscribe((prod) => { 
			  prod.descuento=result.descuento;
			  if(prod.descuento>prod.precio) return this.mensajeService.add("¡El descuento no puede ser mayor que el producto!");
			  prod.tipo=1;
			  this.productoService.putProducto(prod).subscribe(()=>{
				  this.mensajeService.add("Se actualizó la promoción.");
				  this.getProductos();
			  });
			});

		}
  
	  });
	}
  
	
	  getProductos(): void {
		this.productoService.getProducto()
		.subscribe(productos => {
			this.productos = productos.filter(a=>a.descuento > 0);
			this.productos = this.productos.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
			this.datos = new MatTableDataSource(this.productos);
			this.datos.sort = this.sort;
			this.datos.paginator = this.paginator;
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

				this.productoService.getProductoById(producto.id)
			  .subscribe((prod) => { 

				prod.descuento=0;
				prod.tipo=1;
				this.productoService.putProducto(prod).subscribe(()=>{
					this.mensajeService.add("Se eliminó la promoción.");
					this.getProductos();
				});
			  });
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