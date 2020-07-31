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



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  configs: Config[];
  configFinal: Config;
  displayedColumns: string[] = ['id', 'valor'];
  datos;

  constructor(public dialog: MatDialog, private router: Router, private _formBuilder: FormBuilder, private configService: ConfigService, private mensajeService: MensajeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getConfigs();
  }

  getConfigs(): void {
    this.configService.get().subscribe(configs => {
      this.configs = configs.sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
      this.datos = new MatTableDataSource(this.configs);
      this.datos.sort = this.sort;
    })
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }

  crear(): void {
    const dialogRef = this.dialog.open(DialogConfig, {
      width: '500px',
      data: {
        accion: "crear",
        permitir: !true,
        id: "",
        valor: "",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado ${result}`);
      if (result) {
        console.log("Agregando configuracion...");

        let configFinal: Config
        configFinal = {
          "id": result.id,
          "valor": result.valor
        }
        this.configService.create(configFinal).subscribe(() => {
          this.getConfigs()
        });
      }
    });
  }

  editar(config: Config): void {
    const dialogRef = this.dialog.open(DialogConfig, {
      width: '500px',
      data: {
        accion: "editar",
        permitir: true,
        id: config.id,
        valor: config.valor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.configService.update(result).subscribe(() => this.getConfigs);
      }
    });
  }
}

@Component({
  selector: 'dialog-config',
  templateUrl: 'editar.html',
})
export class DialogConfig {
  constructor(
    public dialogRef: MatDialogRef<DialogConfig>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
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

