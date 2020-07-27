import { Usuario } from './../_models/usuario';
import { UsuarioService } from './../_services/usuario.service';
import { UbicacionService } from './../_services/ubicacion.service';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { DireccionService } from '../_services/direccion.service';
import { Direccion } from './../_models/direccion';
import { Ubicacion } from './../_models/ubicacion';
import { MensajeService } from '../_services/mensaje.service';
import { MatStepper } from '@angular/material/stepper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class RegistroUsuarioComponent implements OnInit {
	@ViewChild('stepper') private stepperRef: MatStepper;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	provincias: Ubicacion[];
	cantones: Ubicacion[];
	distritos: Ubicacion[];
	direccion: Direccion;
	usuarioFinal : Usuario;
	constructor(private router: Router, private _formBuilder: FormBuilder, private usuarioService: UsuarioService, private direccionService: DireccionService, private mensajeService: MensajeService, private ubicacionService: UbicacionService) {}
  

	ngOnInit() {
	  this.getProvincias();
	  this.firstFormGroup = this._formBuilder.group({
		cedula: ['', [Validators.required, espacioValidator]],
		nombre: ['', Validators.required],
		primerApellido: ['', Validators.required],
		segundoApellido: ['', Validators.required],
		genero: ['', Validators.required],
		fechaNacimiento: ['', Validators.required],
		correoElectronico: ['', Validators.email],
		numeroTelefono: ['', [Validators.required, Validators.pattern("[0-9]{8}")]],
		
		provincia: ['', Validators.required],
		canton: ['', Validators.required],
		distrito: ['', Validators.required],
		latitud: ['', [Validators.required, Validators.pattern(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
		longitud: ['', [Validators.required, Validators.pattern(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
		otrasSennas: ['', Validators.required]
	  });
	  this.secondFormGroup = this._formBuilder.group({
		  codigo: ['', Validators.required]
	  });
	  this.thirdFormGroup = this._formBuilder.group({
		codigo: ['', Validators.required]
	});
	}

	enviarPrimero(){

		this.direccion = {
			id: -1,
			provincia: this.firstFormGroup.value.provincia,
			canton: this.firstFormGroup.value.canton,
			distrito: this.firstFormGroup.value.distrito,
			sennas: this.firstFormGroup.value.otrasSennas,
			latitud: this.firstFormGroup.value.latitud,
			longitud: this.firstFormGroup.value.longitud
		}


		console.log("Direccion a registrar es: ", this.direccion);
		let direccionFinal: Direccion
		this.direccionService.create(this.direccion).subscribe(() => {
			this.direccionService.get()
			.subscribe(dirs => {
				dirs = dirs.filter((a) => {
					return (a.provincia == this.direccion.provincia && a.canton == this.direccion.canton && a.distrito == this.direccion.distrito && a.latitud == this.direccion.latitud && a.longitud == this.direccion.longitud && a.sennas == this.direccion.sennas);
				  });
				direccionFinal = dirs[0];
				if(direccionFinal){
					this.usuarioFinal = {
						id: this.firstFormGroup.value.cedula,
						nombre: this.firstFormGroup.value.nombre,
						apellidoUno: this.firstFormGroup.value.primerApellido,
						apellidoDos: this.firstFormGroup.value.segundoApellido,
						genero: this.firstFormGroup.value.genero,
						fechaNacimiento: this.firstFormGroup.value.fechaNacimiento,
						correoElectronico: this.firstFormGroup.value.correoElectronico,
						numeroTelefono: this.firstFormGroup.value.numeroTelefono,
						idDireccion: direccionFinal.id,
						estado: "I",
						codigo: ""
					}
				this.usuarioService.create(this.usuarioFinal)
				.subscribe(() => {
					this.usuarioService.phoneVerification(this.usuarioFinal).subscribe();
					this.stepperRef.next();
				});
				}else{
					console.log("Algo ocurrio al buscar el id de la direccion.");
				}

			});

		});
	}


	probarCodigoTelefono(): void{
		this.usuarioService.getBy(this.usuarioFinal.id).subscribe((retUsr) => {
			if(retUsr.codigo == this.secondFormGroup.value.codigo){
				this.mensajeService.add("Código válido");
				this.usuarioService.emailVerification(this.usuarioFinal).subscribe();
				this.stepperRef.next();
			}else{
				this.mensajeService.add("Código inválido");
				this.secondFormGroup.value.codigo = "";
			}
		});
	}



	probarCodigoCorreo(): void{
		this.usuarioService.getBy(this.usuarioFinal.id).subscribe((retUsr) => {
			if(retUsr.codigo == this.thirdFormGroup.value.codigo){
				this.mensajeService.add("Código válido");
				this.usuarioService.sendClave(this.usuarioFinal.id).subscribe();
				retUsr.estado = 'A';
				this.usuarioService.update(retUsr).subscribe(_ => this.mensajeService.add("Cuenta activa"));
				this.stepperRef.next();
			}else{
				this.mensajeService.add("Código inválido");
				this.secondFormGroup.value.codigo = "";
			}
		});
	}

fin(): void{
	this.router.navigate(['/cuenta/login']);
}

	getProvincias(): void {
		this.ubicacionService.getProvincias()
		.subscribe(provincias => this.provincias = Object.keys(provincias).map(key => ({value: Number(key), nombre: provincias[key]})));
	  }

	  
	getCantonesE(event: any): void {
		console.log("Recibido");
		let provincia = event.value;
		console.log(event.value)
		this.ubicacionService.getCantones(provincia)
		.subscribe(cantones => this.cantones = Object.keys(cantones).map(key => ({value: Number(key), nombre: cantones[key]})));
	  }

	
	getDistritosE(event: any): void {
		console.log("Recibido");
		let canton = event.value;
		console.log(event.value)
		this.ubicacionService.getDistritos(this.firstFormGroup.value.provincia, canton)
		.subscribe(distritos => this.distritos = Object.keys(distritos).map(key => ({value: Number(key), nombre: distritos[key]})));
	  }

}



export const espacioValidator: ValidatorFn = (control: FormControl) => {
	if (control.value.includes(' ')) {
	  return {
		'espacio': { value: 'tiene espacio' }
	  };
	}
	return null;
  };

  

  export const esLongitud: ValidatorFn = (control: FormControl) => {
	if (isFinite(control.value) && Math.abs(control.value) <= 180) {
	  return {
		'longitud': { value: 'no es valida' }
	  };
	}
	return null;
  };

  export const esLatitud: ValidatorFn = (control: FormControl) => {
	  if (isFinite(control.value) && Math.abs(control.value) <= 90) {
		return {
		  'latitud': { value: 'no es valida' }
		};
	  }
	  return null;
	};

  