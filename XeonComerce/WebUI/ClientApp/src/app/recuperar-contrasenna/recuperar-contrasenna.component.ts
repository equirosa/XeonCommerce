import { Usuario } from './../_models/usuario';
import { UsuarioService } from './../_services/usuario.service';
import { UbicacionService } from './../_services/ubicacion.service';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { MensajeService } from '../_services/mensaje.service';
import { MatStepper } from '@angular/material/stepper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasenna',
  templateUrl: './recuperar-contrasenna.component.html',
  styleUrls: ['./recuperar-contrasenna.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class RecuperarContrasennaComponent implements OnInit {

  
	usuarioFinal: Usuario;
	@ViewChild('stepper') private stepperRef: MatStepper;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	constructor(private router: Router, private _formBuilder: FormBuilder, private usuarioService: UsuarioService, private mensajeService: MensajeService) {}
  

	ngOnInit() {
	  this.firstFormGroup = this._formBuilder.group({
		correoElectronico: ['', Validators.email],
	  });
	  this.secondFormGroup = this._formBuilder.group({
		codigo: ['', Validators.required],
		contrasennaUno: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
		contrasennaDos: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
	  });
	}

	enviarPrimero(){
		this.usuarioService.get().subscribe((usuarios)=>{
			usuarios = usuarios.filter((a) => {
				return (a.correoElectronico == this.firstFormGroup.value.correoElectronico);
			  });
			  this.usuarioFinal = usuarios[0];
			  if(!this.usuarioFinal) return this.mensajeService.add("No se encontró dicho correo");
			this.usuarioService.emailVerification(this.usuarioFinal).subscribe(_=>this.stepperRef.next());
		});
	}

	probarCodigoCorreo(): void{
		this.usuarioService.getBy(this.usuarioFinal.id).subscribe((retUsr) => {
			if(retUsr.codigo == this.secondFormGroup.value.codigo){
				if(this.secondFormGroup.value.contrasennaUno == this.secondFormGroup.value.contrasennaDos){
					
					this.usuarioService.cambiarClave(this.secondFormGroup.value.contrasennaUno, this.usuarioFinal.id).subscribe(_=>{
						this.stepperRef.next();
					});
				
				}else{
					this.mensajeService.add("Las contraseñas no coinciden");
				}
			}else{
				this.mensajeService.add("Código inválido");
				this.secondFormGroup.value.codigo = "";
			}
		});
	}

fin(): void{
	this.router.navigate(['/cuenta/login']);
}

}