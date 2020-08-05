import { Config } from './../_models/config';
import { ConfigService } from './../_services/config.service';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { MensajeService } from '../_services/mensaje.service';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  maxCancelar: Config;
  minContrasennas: Config;
  accion;
  configuracion: FormGroup;

  constructor(public dialog: MatDialog, private router: Router, private _formBuilder: FormBuilder, private configService: ConfigService, private mensajeService: MensajeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
	  this.configuracion = this._formBuilder.group({
      diasAntelacion: ['', [Validators.required,  Validators.pattern("[0-9]")]],
      contrasennas: ['', [Validators.required, Validators.pattern("[0-9]")]],
      });
      this.getConfigs();
  }

  getConfigs(): void {
    this.configService.getById("CONTRASENNA_VALIDA_H").subscribe(config =>{
      this.minContrasennas = config;
      this.configuracion.get("contrasennas").setValue(this.minContrasennas.valor);
    });
    this.configService.getById("MIN_DIAS_CANCELAR_CI").subscribe(config =>{
      this.maxCancelar = config;
      this.configuracion.get("diasAntelacion").setValue(this.maxCancelar.valor);
    });
  }

  update(): void {
    this.maxCancelar.valor = this.configuracion.get("diasAntelacion").value;
    this.minContrasennas.valor = this.configuracion.get("contrasennas").value;
    this.configService.update(this.maxCancelar).subscribe(result => {
      if (result){
        console.log("Dias de cancelacion actualizados.");
      }
    });
    this.configService.update(this.minContrasennas).subscribe(result=>{
      console.log(result);
    });
  }
}