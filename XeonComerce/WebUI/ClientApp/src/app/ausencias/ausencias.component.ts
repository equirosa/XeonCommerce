import { Ausencias } from './../_models/ausencias';
import { AusenciasService } from './../_services/ausencias.service';
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
  selector: 'app-ausencias',
  templateUrl: './ausencias.component.html',
  styleUrls: ['./ausencias.component.css']
})
export class AusenciasComponent implements OnInit {
  cantAusencias: Ausencias;
  accion;
  ausencias: FormGroup;

  constructor(public dialog: MatDialog, private router: Router, private _formBuilder: FormBuilder, private ausenciasService: AusenciasService, private mensajeService: MensajeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.ausencias = this._formBuilder.group({
      paramAusencias: ['', [Validators.required, Validators.pattern("[0-9]")]]
    });
    this.getAusencias();
  }

  getAusencias(): void {
    this.ausenciasService.getById("Max_Ausencias").subscribe(aus => {
      this.cantAusencias = aus;
      this.ausencias.get("paramAusencias").setValue(this.cantAusencias.valor);
    });
  }

  update(): void {
    this.cantAusencias.valor = this.ausencias.get("paramAusencias").value;
    this.ausenciasService.update(this.cantAusencias).subscribe(result => {
      console.log(result);
    });
  }

}
