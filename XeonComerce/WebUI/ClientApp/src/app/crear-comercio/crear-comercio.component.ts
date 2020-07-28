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

@Component({
	selector: 'app-crear-comercio',
	templateUrl: './crear-comercio.component.html',
	styleUrls: ['./crear-comercio.component.css']
})
export class CrearComercioComponent implements OnInit {
    user: User;

	constructor(private accountService: AccountService, private router: Router, public dialog: MatDialog, private comercioService: ComercioService, private direccionService: DireccionService, private mensajeService: MensajeService,
		 private ubicacionService: UbicacionService) { 
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
			this.dialog.closeAll();
			this.router.navigate(['/']);
			this.mensajeService.add("¡Usted ya tiene un comercio!");
		}
	});
   
    }

   

   getProvincias(): void {
	this.ubicacionService.getProvincias()
	.subscribe(provincias => {this.provincias = Object.keys(provincias).map(key => ({value: Number(key), nombre: provincias[key]}))

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
			lat: "",
			long: "",
			dir: true,
			sennas: ""
		  }
  
	  });
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Resultado: ${result}`); 
		if (result) {
			//Revisar si están los datos de dir y crearla retornar el id y ya.
			console.log("Primero se crea una dirección");
			

			this.direccion = {
				id: -1,
				provincia: result.provincia,
				canton: result.canton,
				distrito: result.distrito,
				sennas: result.sennas,
				latitud: result.lat,
				longitud: result.long,
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

								this.dialog.open(UploadComercioFilesComponent, {
									width: '500px',
									data: {
									  idComercio: comFinal.cedJuridica
									}
							  
								  });
							  
								  dialogRef.afterClosed().subscribe(result => {
									console.log(`Resultado: ${result}`); 
									this.mensajeService.add("Se creó la solicitud de comercio");
									this.router.navigate(["/"]);
								  });

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
  }
  
}