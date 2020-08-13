import { CategoriaComercioService } from './../_services/categoriaComercio.service';
import { CategoriaService } from './../_services/categoria.service';
import { Bitacora } from './../_models/bitacora';
import { BitacoraService } from './../_services/bitacora.service';
import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { UploadComercioFilesComponent } from './upload-comercio-files.dialog';
import { Router } from '@angular/router';
import { UbicacionService } from './../_services/ubicacion.service';
import { DireccionService } from './../_services/direccion.service';
import { ComercioService } from './../_services/comercio.service';
import { MatDialog } from '@angular/material/dialog';
import { Comercio } from './../_models/comercio';
import { Ubicacion } from './../_models/ubicacion';
import { Direccion } from './../_models/direccion';
import { DialogComercio } from './../comercios/comercios.component';
import { Component, OnInit, Input, NgZone, Inject } from '@angular/core';
import { MensajeService } from '../_services/mensaje.service';
import { CategoriaComercio } from '../_models/categoriaComercio';

@Component({
	selector: 'app-crear-comercio',
	templateUrl: './crear-comercio.component.html',
	styleUrls: ['./crear-comercio.component.css']
})
export class CrearComercioComponent implements OnInit {
    user: User;

	constructor(private categoriaComercioService : CategoriaComercioService, private categoriaService : CategoriaService, private accountService: AccountService, private router: Router, public dialog: MatDialog, private comercioService: ComercioService, private direccionService: DireccionService, private mensajeService: MensajeService,
		 private ubicacionService: UbicacionService, private bitacoraService: BitacoraService) { 
			this.user = this.accountService.userValue; }
  

	comercioCrear: Comercio;
	provincias: Ubicacion[];
	cantones: Ubicacion[];
	distritos: Ubicacion[];
	direccion: Direccion;
	datos;


  ngOnInit(): void {
   
	this.getProvincias();
	this.comercioService.get().subscribe((comercios)=>{
				
		let usr = comercios.find(c=>c.idUsuario == this.user.id);
		if(usr){
			this.router.navigate(['/']);
			this.mensajeService.add("¡Usted ya tiene un comercio!");
			this.dialog.closeAll();
		}
	});
   
    }

   
	estaCompleto(a){
		let obj = Object.keys(a);
		for(let i = 0; i<obj.length; i++){
		  if(obj[i] != "direccion" && (a[obj[i]] === "" || a[obj[i]] === " ")) return false;
		  }
		return true;
	}

   getProvincias(): void {
	this.ubicacionService.getProvincias()
	.subscribe(provincias => {this.provincias = Object.keys(provincias).map(key => ({value: Number(key), nombre: provincias[key]}))
	this.categoriaService.get().subscribe((categorias)=>{
	const dialogRef = this.dialog.open(DialogComercio, {
		width: '500px',
		data: {
			accion: "crear",
			noEsAdmin: true,
			permitir: !true,
			cedJuridica: "",
			nombreComercial: "",
			correoElectronico: "",
			telefono: "",
			direccion: "",
			idUsuario: this.user.id,
			estado: "P",
			provincias: this.provincias,
			cantones: this.cantones,
			distritos: this.distritos,
			provincia: "",
			canton: "",
			distrito: "",
			latitud: 9.7489,
			longitud: -83.7534,
			dir: true,
			sennas: "",
			categorias: categorias,
			categoriasPreferidas: []
		  }
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		
		if(!this.estaCompleto(result)){
			this.mensajeService.add("Favor llene todos los datos");
			return;
		}
		if (result) {
			//Revisar si están los datos de dir y crearla retornar el id y ya.
			console.log("Primero se crea una dirección");
			

			this.direccion = {
				id: -1,
				provincia: result.provincia,
				canton: result.canton,
				distrito: result.distrito,
				sennas: result.sennas,
				latitud: result.latitud.toString(),
				longitud: result.longitud.toString(),
			}
			let direccionFinal: Direccion
			this.direccionService.create(this.direccion).subscribe(() => {
				this.direccionService.get()
				.subscribe(dirs => {
					dirs = dirs.filter((a) => {
						return (a.provincia == this.direccion.provincia && a.canton == this.direccion.canton && a.distrito == this.direccion.distrito && a.latitud == this.direccion.latitud && a.longitud == this.direccion.longitud && a.sennas == this.direccion.sennas);
					  });
					direccionFinal = dirs[0];
					if(direccionFinal){
						console.log("Direccion a registrar es: ", this.direccion);
						let comercioFinal : Comercio;
						comercioFinal = {
							"cedJuridica": result.cedJuridica,
							"nombreComercial": result.nombreComercial,
							"correoElectronico": result.correoElectronico,
							"telefono": result.telefono,
							"direccion": direccionFinal.id,
							"idUsuario": result.idUsuario,
							"estado": result.estado
						}
					this.comercioService.create(comercioFinal)
					.subscribe(() => {

						let comFinal: Comercio;
						this.comercioService.get()
						.subscribe(comercios => {
							comercios = comercios.filter((a) => {
								return (a.cedJuridica == comercioFinal.cedJuridica && a.idUsuario == this.user.id);
							  });
							  comFinal = comercios[0];
							if(comFinal){

								for(let i = 0; i<result.categoriasPreferidas.length; i++){
									let cat : CategoriaComercio;
									cat = { idCategoria: result.categoriasPreferidas[i], idComercio: result.cedJuridica };
									this.categoriaComercioService.create(cat).subscribe(()=>{
										if(i==result.categoriasPreferidas.length-1){
											this.mensajeService.add("Se creó la solicitud de comercio");
											var log: Bitacora;
											log = {
												idUsuario: this.user.id,
												accion: "Crear",
												detalle: `Se creó solicitud del comercio (${comFinal.cedJuridica}) ${comFinal.nombreComercial}`,
												id: -1,
												fecha: new Date()
											}
											this.bitacoraService.create(log).subscribe();
											this.router.navigate(["/archivos"]);
										}
									});
								}

							}
						});

					});
					}else{
						console.log("Algo ocurrio al buscar el id de la direccion.");
					}

				});

			});
		}else{
			this.router.navigate(["/"]);
		}
  
	  });

	});
});
  }
  
}