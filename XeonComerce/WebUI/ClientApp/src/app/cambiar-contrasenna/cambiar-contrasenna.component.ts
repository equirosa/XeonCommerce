import { User } from './../_models/user';
import { AccountService } from '@app/_services';
import { Usuario } from './../_models/usuario';
import { User } from './../_models/user';
import { UsuarioService } from './../_services/usuario.service';
import { UbicacionService } from './../_services/ubicacion.service';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { DireccionService } from '../_services/direccion.service';
import { Direccion } from './../_models/direccion';
import { Ubicacion } from './../_models/ubicacion';
import { MensajeService } from '../_services/mensaje.service';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cambiar-contrasenna',
  templateUrl: './cambiar-contrasenna.component.html',
  styleUrls: ['./cambiar-contrasenna.component.css']
})
export class CambiarContrasennaComponent implements OnInit {

    user: User;
	firstFormGroup: FormGroup;
	constructor(private router: Router, private _formBuilder: FormBuilder, private accountService: AccountService, private usuarioService: UsuarioService, private mensajeService: MensajeService, private ubicacionService: UbicacionService) {}
  
  ngOnInit(): void {
	this.user = this.accountService.userValue;
	this.firstFormGroup = this._formBuilder.group({
		actual: ['', Validators.required],
		nueva: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
		nueva2: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
	  });
  }

  intentarCambiar(){
	this.accountService.login(this.user.correoElectronico, this.firstFormGroup.value.actual)
	.pipe(first())
	.subscribe(
		data => {
			console.log("Es", data);
			if(this.firstFormGroup.value.nueva == this.firstFormGroup.value.nueva2){
				
				this.usuarioService.cambiarClave(this.firstFormGroup.value.nueva, this.user.id).subscribe(_=>{
					this.router.navigate(['/']);
				});
			
			}else{
				this.mensajeService.add("Las contraseñas no coinciden");
			}
		},
		error => {
			this.mensajeService.add("Contraseña actual incorrecta");
		});
	
}

}
