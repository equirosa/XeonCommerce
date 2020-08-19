import { CarritoService } from './../_services/carrito.service';
import { Servicio } from './../_models/servicio';
import { ServiciosService } from './../_services/servicios.service';
import { ProductoService } from './../_services/producto.service';
import { CategoriaComercio } from './../_models/categoriaComercio';
import { CategoriaComercioService } from './../_services/categoriaComercio.service';
import { CategoriaUsuarioService } from './../_services/categoriaUsuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaUsuario } from './../_models/categoriaUsuario';
import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
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
import { Producto } from '../_models/producto';
import { Carrito } from '../_models/carrito';
import { TransaccionFinancieraService } from './../_services/transaccionFinanciera.service';
import { TransaccionFinanciera } from './../_models/transaccionFinanciera';
import { FacturaDetalleService } from './../_services/facturaDetalle.service';
import { FacturaDetalle } from './../_models/facturaDetalle';
import { FacturaMaestro } from './../_models/facturaMaestro';
import { FacturaMaestroService } from './../_services/facturaMaestro.service';

@Component({
	selector: 'app-recomendaciones',
	templateUrl: './recomendaciones.component.html',
	styleUrls: ['./recomendaciones.component.css']
  })
  export class RecomendacionesComponent implements OnInit {

  clienteBloqueado: boolean = false;

  transaccionesPendientes: TransaccionFinanciera[];
  facturasConMulta: FacturaDetalle[];
  facturasMaestro: FacturaMaestro[];
	comercios: Comercio[];
	categorias: number[] = [];
	catCom: CategoriaComercio[] = [];
	length;
	length2;
	pageSize = 5;
	filtro: string;
	pageEvent: PageEvent;
	pageEvent2: PageEvent;
	user: User;
	prodyserv: (Producto|Servicio)[] = [];
	
	constructor(public dialog: MatDialog, private comercioService: ComercioService, private direccionService: DireccionService,
		 private mensajeService: MensajeService, private productoService: ProductoService, private serviciosService: ServiciosService,
		  private categoriaUsuarioService: CategoriaUsuarioService, private categoriaComercioService: CategoriaComercioService,
    private carritoService: CarritoService, private accountService: AccountService, private router: Router, private facturaMaestroService: FacturaMaestroService,
    private facturaDetalleService: FacturaDetalleService,
    private transaccionFinancieraService: TransaccionFinancieraService) { 
			 this.accountService.user.subscribe(x => {
			this.user = x;
		});}
  

	
  ngOnInit() {
    this.obtenerFacturasConMulta();
		this.getCategoriasComercios();
	}

	getIntereses(): void {
		this.categoriaUsuarioService.getByUsuario(this.user.id).subscribe((categorias)=>{
			console.log(categorias);
			this.categorias = categorias.map(a => a.idCategoria);
			this.getComercios();
		});
	}

	getCategoriasComercios(): void {
		this.categoriaComercioService.get().subscribe((i)=>{
			this.catCom=i;
			this.getIntereses();
		});
	}

	  getComercios(): void {
		this.comercioService.get()
		.subscribe(comercios => {
			this.comercios = comercios.sort((a, b) => {
				return a.nombreComercial.localeCompare(b.nombreComercial);
			  });
			  console.log(this.comercios)
			  this.comercios = this.comercios.filter((a)=> a.estado == 'A' || a.estado == "");
			this.comercios = this.comercios.filter((a)=>{

					let i = this.catCom.filter((i)=>i.idComercio==a.cedJuridica);
					let catCom = i.map(a => a.idCategoria);
					if(catCom.some(r=> this.categorias.includes(r))) console.log("Se recomienda el comercio "+ a.nombreComercial)
        return catCom.some(r => this.categorias.includes(r));


			});
			console.log(this.comercios);
			this.length = this.comercios.length;
			this.getProductosyServicios();
		});
	}
	
	verDireccion(comercio: Comercio): void {
		this.direccionService.getBy(comercio.direccion).subscribe((dir)=>{
			dir.latitud = Number(dir.latitud);
			dir.longitud = Number(dir.longitud);
			const dialogRef = this.dialog.open(DialogDireccion, {
				maxWidth: "500px",
				data: Object.assign({
					provincias: "",
					cantones: "",
					distritos: "",
					permitir: !false
				}, dir)
			  });
		});
	}

	getProductosyServicios(): void {
		this.comercios.forEach(i => {
			this.productoService.getProducto().subscribe(productos => {
				productos=productos.filter((a)=>a.idComercio==i.cedJuridica);
				if(productos) this.prodyserv = this.prodyserv.concat(productos);
				
				this.serviciosService.getServicio().subscribe(servicios => {
					servicios=servicios.filter((a)=>a.idComercio==i.cedJuridica);
					if(servicios) this.prodyserv = this.prodyserv.concat(servicios);
					this.length2=this.prodyserv.length;
					this.prodyserv = this.prodyserv.sort((a, b) => {
						return a.nombre.localeCompare(b.nombre);
					  });
				});
			});
		});
	}

  agregarCarrito(producto: Producto) {
    if (this.clienteBloqueado) {
      this.router.navigate(['historial']);
      this.mensajeService.add("¡Multa Pendiente!");
      return;
    } else {
      let car: Carrito;
      car = {
        cantidad: 1,
        idUsuario: this.user.id,
        idProducto: producto.id
      }
      this.carritoService.create(car).subscribe();
    }
  }

  obtenerFacturasConMulta(): void {
    this.facturaDetalleService.get().subscribe((detalles) => {
      this.facturasConMulta = detalles.filter((i) => i.idProducto == 97);
      this.obtenerFacturasMaestroConMulta(this.facturasConMulta);
    });
  }

  obtenerFacturasMaestroConMulta(facDetalle: FacturaDetalle[]): void {
    let facturasMulta: FacturaMaestro[];
    this.facturaMaestroService.get().subscribe((facMaestro) => {
      facturasMulta = new Array(facMaestro.length);
      for (var i = 0; i < facDetalle.length; i++) {
        for (var j = 0; j < facMaestro.length; j++) {
          if (facDetalle[i].idFactura == facMaestro[j].idFactura && facMaestro[j].idCliente == this.user.id) {
            facturasMulta[i] = facMaestro[j];
          }
        }
      }
      this.obtenerEstadoFacturaCliente(facturasMulta);
    });
  }

  obtenerEstadoFacturaCliente(facturasConMulta: FacturaMaestro[]): void {
    this.transaccionFinancieraService.get().subscribe((transaccionFinanciera) => {
      this.transaccionesPendientes = transaccionFinanciera.filter((i) => i.estado == "P");
      this.bloquearCliente(facturasConMulta, this.transaccionesPendientes);
    });
  }

  bloquearCliente(facturasConMulta: FacturaMaestro[], tranPendiente: TransaccionFinanciera[]): void {
    for (var i = 0; i < facturasConMulta.length; i++) {
      for (var j = 0; j < tranPendiente.length; j++) {
        if (facturasConMulta[i].idTransaccion == tranPendiente[j].id) {
          this.clienteBloqueado = true;
        }
      }
    }
    console.log(this.clienteBloqueado);
  }
  
}
