import { AccountService } from '@app/_services';
import { AusenciasService } from './../_services/ausencias.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { MensajeService } from '../_services/mensaje.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ausencias } from '../_models/ausencias';



@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {
  multa: Ausencias;
  accion;
  configuracion: FormGroup;
  user: any;

  constructor(public dialog: MatDialog, private router: Router, private _formBuilder: FormBuilder, private ausenciasService: AusenciasService, private mensajeService: MensajeService, private accountService: AccountService) {
	this.accountService.user.subscribe(x => {
		this.user = x;
	}); }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
	  this.configuracion = this._formBuilder.group({
		multa: ['', [Validators.required,  Validators.pattern("[0-9]")]]
	  });
	  this.configuracion.get('multa').setValue(0);
      this.getConfigs();
  }


  getConfigs(): void {
    this.ausenciasService.get().subscribe(configs =>{
	  this.multa = configs.filter((i)=>i.id_Comercio == this.user.comercio.cedJuridica && i.id == "MULTA")[0];
	  if(!this.multa){
		  let a : Ausencias;
		  a = {
			  id_Comercio: this.user.comercio.cedJuridica,
			  id: "MULTA",
			  valor: 0
		  }
		  this.ausenciasService.create(a).subscribe();
		  this.multa = a;
		  this.configuracion.controls['multa'].setValue(this.multa.valor);
	  }else{
		this.configuracion.controls['multa'].setValue(this.multa.valor);
	  }
    });
  }

  update(): void {
    this.multa.valor = this.configuracion.controls['multa'].value;
    this.ausenciasService.update(this.multa).subscribe(result => {
      if (result){
        console.log("Dias de cancelacion actualizados.");
      }
    });
  }
}