import { PageEvent } from '@angular/material/paginator';
import { Sucursal } from './../../_models/sucursal';
import { SucursalService } from './../../_services/sucursal.service';
import { Ubicacion } from './../../_models/ubicacion';
import { UbicacionService } from './../../_services/ubicacion.service';
import { DireccionService } from './../../_services/direccion.service';
import { Direccion } from './../../_models/direccion';
import { MensajeService } from './../../_services/mensaje.service';
import { ComercioService } from './../../_services/comercio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comercio } from '../../_models/comercio';
import { Producto } from '../../_models/producto';
import { CalificacionService } from '../../_services/calificacion.service';
import { Calificacion } from '../../_models/Calificacion';
import { ProductoService } from '../../_services/producto.service';

@Component({
  selector: 'app-perfil-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class PerfilComercioComponent implements OnInit {

	comercio: Comercio;
	direccion: Direccion;
	provincias: Ubicacion[];
	cantones: Ubicacion[];
	distritos: Ubicacion[];
  sucursales: Sucursal[];
	length = 0;
	pageSize = 1;
	filtro: string;
  pageEvent: PageEvent;
  starWidth: number;
  promCalificacion: number = 0;

  constructor(private productoService: ProductoService,private route : ActivatedRoute, private comercioService : ComercioService, private mensajeService : MensajeService,
	 private router : Router, private direccionService:DireccionService, private ubicacionService: UbicacionService,
    private sucursalService: SucursalService ,private calificacionService: CalificacionService) { }

  ngOnInit(): void {
	this.getProvincias();
	let id = this.route.snapshot.params['id'];
	this.comercioService.getBy(id).subscribe((comercio)=>{
		if(comercio!=null){
      this.comercio = comercio;

			this.direccionService.getBy(comercio.direccion).subscribe((direccion)=>{
				if(direccion!=null){
					this.direccion = direccion;
					this.direccion.longitud = Number(this.direccion.longitud);
					this.direccion.latitud = Number(this.direccion.latitud);
					this.getCantonesE();
					this.getDistritosE();

					this.sucursalService.get().subscribe((sucursales)=>{
						this.sucursales = sucursales.filter((i)=>i.idComercio==this.comercio.cedJuridica);
						if(this.sucursales.length==0) this.sucursales = null;
						this.length = this.sucursales.length;
					});

				}else{
					this.mensajeService.add("Ha ocurrido un error");
					this.router.navigate(["/comercio"]);
				}
			});
		}else{
			this.mensajeService.add("No existe dicho comercio");
			this.router.navigate(["/comercio"]);
		}
    this.calcularPromedio(this.comercio);
  });
  }






  calcularPromedio(comercio : Comercio) {
    let promCalificaciones: number = 0;
    this.calificacionService.obtenerCalificaciones().subscribe((calificacion) => {
      this.productoService.getProducto().subscribe(productos => {
        let calificacionesComercio = this.obtenerCalificacionesPorComercio(calificacion, productos, comercio);
        debugger;
        if (calificacionesComercio.length == 0) {
          this.starWidth = 5 * 130 / 5;
          this.promCalificacion = 5;
        } else {
          promCalificaciones = this.obtenerCalificacionFinal(calificacion);
          this.starWidth = promCalificaciones * 130 / 5;
          this.promCalificacion = promCalificaciones;
        }
      });
    });
  }

  obtenerCalificacionFinal(calificaciones: Calificacion[]): number {
    let ratingComercio: number = 0;
    for (var i = 0; i < calificaciones.length; i++) {
      ratingComercio = ratingComercio + calificaciones[i].calificacion;
    }
    ratingComercio = Math.round(ratingComercio / calificaciones.length * 10) / 10;
    console.log(ratingComercio);
    return ratingComercio;
  }

  obtenerCalificacionesPorComercio(calificaciones: Calificacion[], productos: Producto[], comercio: Comercio): Calificacion[] {
    let calificacionesPorComercio: Calificacion[] = new Array(0);
    let cont: number = 0;
    for (var i = 0; i < calificaciones.length; i++) {
      for (var j = 0; j < productos.length; j++) {
        if (calificaciones[i].idProducto == productos[j].id && productos[j].idComercio == comercio.cedJuridica) {
          calificacionesPorComercio[cont] = calificaciones[i];
          cont++;
        }
      }
    }
    console.log(calificacionesPorComercio);
    return calificacionesPorComercio;
  }


  getProvincias(): void {
	this.ubicacionService.getProvincias()
	.subscribe(provincias => this.provincias = Object.keys(provincias).map(key => ({value: Number(key), nombre: provincias[key]})));
  }

	
  getCantonesE(): void {
	let provincia = this.direccion.provincia;
	this.ubicacionService.getCantones(provincia)
	.subscribe(cantones => this.cantones = Object.keys(cantones).map(key => ({value: Number(key), nombre: cantones[key]})));
  }


getDistritosE(): void {
	let canton = this.direccion.canton;
	this.ubicacionService.getDistritos(this.direccion.provincia, canton)
	.subscribe(distritos => this.distritos = Object.keys(distritos).map(key => ({value: Number(key), nombre: distritos[key]})));
  }


}

